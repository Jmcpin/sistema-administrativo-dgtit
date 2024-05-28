import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor( //Este constructor se ejecuta cuando se crea el servicio, como el servicio se inyecta en los componentes
  // cada vez que se crea un componente, se estaria ejecutando esta logica del servicio del contructor
  private firebaseAuthenticationService: AngularFireAuth,
  private router: Router, //redireccion de rutas
  private ngZone: NgZone // para asegurar que se ejecute codigo de angular
) { 
    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    //Observa el estado de la autentificación con AuthState
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) { // si existe un usuario, lo va a setear a localstorage con sus datos actualizados
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else { // y si no esta un usuario logeado, el local storage lo va a setear a nulo
        localStorage.setItem('user', 'null');
      }
    })

  }

  // log-in with email and password
  logInWithEmailAndPassword(email: string, password: string) { //1 paso
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)//devuelve una promesa
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  // log-in with google
  logInWithGoogleProvider() { //1 paso
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider()) //devuelve una promesa
    //signInWithPopup es la ventana emergente para logearse con google
    // new GoogleAuthProvider es el provedor de google
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);
      })
  }

  // Registarnos with email and password
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  observeUserState() { //authState Observa el estado de la autentificacion
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']))
      //Si existe un usuario logeado, lo va a redirigir al dasboard
    })
  }

  // return true when user is logged in
  //se ocupa en el guard para proteger la ruta en el dashboard
  get isLoggedIn(): boolean { // devuelve un booleano para saber si esta logeado o no un usuario
    const user = JSON.parse(localStorage.getItem('user')!); // JSON.parse lo devuelve como un objeto
    return user !== null;
  }

  // logOut
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from './environments/environment';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirebaseApp(() => initializeApp({"projectId":"sistema-administrativo-dgtit","appId":"1:106654263993:web:f565875b17a94b60a8c968","storageBucket":"sistema-administrativo-dgtit.appspot.com","apiKey":"AIzaSyCEXm5XKV2x76pd_fn3I1oBxwqvJKJ17Vw","authDomain":"sistema-administrativo-dgtit.firebaseapp.com","messagingSenderId":"106654263993"})),
    provideAuth(() => getAuth()),

    //error solution NullInjectError
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

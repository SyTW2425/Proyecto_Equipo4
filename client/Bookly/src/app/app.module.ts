import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent, // Agrega tus componentes aquí
    SignUpComponent
  ],
  imports: [
    BrowserModule, // Otros módulos necesarios aquí
    //AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AppareilComponent } from './appareil/appareil.component';

import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService} from "./services/auth.service";
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import {AuthGard} from "./services/auth-gard.service";

const appRoutes: Routes = [
  {path: 'appareils', canActivate: [AuthGard], component: AppareilViewComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AppareilViewComponent},
  {path: 'appareils/:id', canActivate: [AuthGard], component: SingleAppareilComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo:'/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

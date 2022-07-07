import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreaturesComponent } from './components/creatures/creatures.component';
import { FamillesComponent } from './components/familles/familles.component';
import { RegionsComponent } from './components/regions/regions.component';
import { ZonesComponent } from './components/zones/zones.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FamilleCreatureComponent } from './components/famille-creature/famille-creature.component';
import { FamilleZoneComponent } from './components/famille-zone/famille-zone.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAddComponent } from './components/admin/admin-add/admin-add.component';
import { AdminUpdateComponent } from './components/admin/admin-update/admin-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    PageNotFoundComponent,
    CreaturesComponent,
    FamillesComponent,
    RegionsComponent,
    ZonesComponent,
    LoginComponent,
    FamilleCreatureComponent,
    FamilleZoneComponent,
    AdminComponent,
    AdminAddComponent,
    AdminUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

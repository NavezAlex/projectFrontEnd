import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddComponent } from './components/admin/admin-add/admin-add.component';
import { AdminUpdateComponent } from './components/admin/admin-update/admin-update.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreaturesComponent } from './components/creatures/creatures.component';
import { FamilleCreatureComponent } from './components/famille-creature/famille-creature.component';
import { FamilleZoneComponent } from './components/famille-zone/famille-zone.component';
import { FamillesComponent } from './components/familles/familles.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegionsComponent } from './components/regions/regions.component';
import { ZonesComponent } from './components/zones/zones.component';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component : HomeComponent},
  {path:'creatures', component : CreaturesComponent},
  {path:'familles', component : FamillesComponent},
  {path:'regions', component : RegionsComponent},
  {path:'zones', component : ZonesComponent},
  {path:'zones/:name', component : ZonesComponent},
  {path:'familleCreature/:name', component : FamilleCreatureComponent},
  {path: 'familleZone/:name', component: FamilleZoneComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard]},
  {path: 'admin-add', component: AdminAddComponent, canActivate: [IsAdminGuard]},
  {path: 'admin-update/:index', component: AdminUpdateComponent, canActivate: [IsAdminGuard]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

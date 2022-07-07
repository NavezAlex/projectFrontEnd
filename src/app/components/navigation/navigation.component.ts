import { Component, OnInit } from '@angular/core';
import { data } from 'src/app/data/data';
import { extens } from 'src/app/data/extentions';
import { Link } from 'src/app/models/link';
import { ExtService } from 'src/app/services/ext.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public home = new Link('Home', '/home');

  public icons: any[] = data;

  public extents: any[] = extens;

  public menu : Link[] = [
    new Link('Créatures','/creatures'),
    new Link('Familles','/familles'),
    new Link('Régions','/regions'),
    new Link('Zones','/zones')
  ];
  router: any;

  constructor(private _extService : ExtService, public loginService: LoginService) { }

  selectedGen : number = Number.parseInt(localStorage.getItem("genId") ?? '');

  choixExt : number = 7;
  isClass : String = 'bfa';

  ngOnInit(): void {
    localStorage.setItem("genId", (this.choixExt+1).toString());
    this.isClass = this.icons[this.choixExt].nom;
  }

  changeExt(nb :number){
    this.choixExt = nb;

    this._extService.setGen(this.choixExt+1);
    
    this.isClass = this.icons[this.choixExt].nom;
  }

}

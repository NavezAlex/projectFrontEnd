import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IconFamille } from 'src/app/data/IconFamille';
import { Famille } from 'src/app/models/famille.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-familles',
  templateUrl: './familles.component.html',
  styleUrls: ['./familles.component.scss']
})
export class FamillesComponent implements OnInit {

  familles!: Famille[] ;

  typeFamille! : string;

  public iconFamilles: any[] = IconFamille;

  displayedColumns: string[] = ['image', 'name_famille', 'name_type', 'gene_id', 'exotic'];
  dataSource : any;

  idColor : String = 'bfa';

  constructor(private _extService : ExtService, private client : HttpClient) { }

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  ngOnInit(): void {
    this.typeFamille = '';
    this._extService.genChange.subscribe({
      next : id => {this.loadData(); }
    } );
  }

  private loadData(){
    
    if(this.typeFamille){
      this.client.get<Famille[]>(environment.base_api_url +'/famille/type/'+ this.typeFamille +'/gen/' + this.id )
      .subscribe({
        next: data => { this.familles = data; this.dataSource = new MatTableDataSource<Famille>(data);}, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
    }
    else{
      this.client.get<Famille[]>(environment.base_api_url + '/famille/gen/' + this.id )
      .subscribe({
        next: data => { this.familles = data; this.dataSource = new MatTableDataSource<Famille>(data);}, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
    }
    switch(this.id){
      case 1: 
        this.idColor = 'vanilla';
        break;
      case 2: 
        this.idColor = 'bc';
        break;
      case 3: 
        this.idColor = 'wotlk';
        break;
      case 4: 
        this.idColor = 'cata';
        break;
      case 5: 
        this.idColor = 'mop';
        break;
      case 6: 
        this.idColor = 'wod';
        break;
      case 7: 
        this.idColor = 'legion';
        break;
      case 8: 
        this.idColor = 'bfa';
        break;
      default:
          break;
  }
  }

  chargeAll(){
    this.typeFamille = '';
    this.loadData();
  }

  chargeType(type : string){

    this.typeFamille = type;

    this.client.get<Famille[]>(environment.base_api_url +'/famille/type/'+ type +'/gen/' + this.id )
      .subscribe({
        next: data => { this.familles = data; this.dataSource = new MatTableDataSource<Famille>(data);}, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });    
  }

  chargeExotic(){

    if(this.typeFamille == ''){
      this.client.get<Famille[]>(environment.base_api_url +'/famille/gen/'+ this.id +'/exotic' )
      .subscribe({
        next: data => { this.familles = data; this.dataSource = new MatTableDataSource<Famille>(data);}, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      }); 
    }
    else{
      this.client.get<Famille[]>(environment.base_api_url +'/famille/type/'+ this.typeFamille +'/gen/'+ this.id +'/exotic' )
      .subscribe({
        next: data => { this.familles = data; this.dataSource = new MatTableDataSource<Famille>(data);}, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      }); 
    }
  }

}

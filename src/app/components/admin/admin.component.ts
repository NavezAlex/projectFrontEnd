import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Creature } from 'src/app/models/creature.model';
import { User } from 'src/app/models/user';
import { ExtService } from 'src/app/services/ext.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  connectedUser : User | undefined = undefined;
  isLogged : boolean | undefined;
  private currentUserSubject: BehaviorSubject<any>;

  listCreatures!: Creature[] ;

  displayedColumns: string[] = ['id', 'nom_Famille', 'name', 'gene_id', 'rare_niveau', 'edit', 'delete'];
  dataSource : any;

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private _extService : ExtService, private client : HttpClient ,private _loginService : LoginService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('currentUser') ?? null);
  }

  ngOnInit(): void {
    this._extService.genChange.subscribe({
      next : id => {this.loadData(); }
    } );
  }

  private loadData(){
    this.client.get<Creature[]>(environment.base_api_url + '/creature/gen/' + this.id )
      .subscribe({
        next: data => { 
            this.listCreatures = data;
            this.dataSource = new MatTableDataSource<Creature>(data);
            this.dataSource.paginator = this.paginator;
          }, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
  }
  
  public chargeRare(rare : number){
    if(rare == 1){
      return "Normal";
    } 
    else if(rare == 2){
      return "Rare";
    }
    else if(rare == 3){
      return "Élite";
    }
    else if(rare = 4){
      return "Élite Rare";
    }
    else return "Error";
  }

  logout(){
    this.connectedUser = this._loginService.deconnexion();
  }

  public createBeast(){
    this.router.navigateByUrl('/admin-add');
  }

  deleteBeast(idToDelete : number){

    console.log("Créature Supprimée")

    // this.client.delete(environment.base_api_url +'/creature/delete/'+ idToDelete)
    // .subscribe( () => { 
    //   this.loadData();
    // });
  }

  public editBeast(beast_index : number) : void {
    console.log(beast_index);
    this.router.navigateByUrl('/admin-update/' + beast_index);
  }

  

}

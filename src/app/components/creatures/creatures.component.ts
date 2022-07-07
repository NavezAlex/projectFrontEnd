import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Creature } from 'src/app/models/creature.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.scss']
})
export class CreaturesComponent implements OnInit {

  creatures!: Creature[] ;

  displayedColumns: string[] = ['nom_Famille', 'name', 'gene_id', 'rare_niveau'];
  dataSource : any;

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor( private _extService : ExtService, private client : HttpClient ) {  }

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  idColor : String = 'bfa';

  ngOnInit(): void {
    this._extService.genChange.subscribe({
      next : id => {this.loadData(); }
    } );
  }

  private loadData(){
    this.client.get<Creature[]>(environment.base_api_url + '/creature/gen/' + this.id )
      .subscribe({
        next: data => { 
          this.creatures = data;
          this.dataSource = new MatTableDataSource<Creature>(data);
          this.dataSource.paginator = this.paginator;
        }, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
    
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
  
}

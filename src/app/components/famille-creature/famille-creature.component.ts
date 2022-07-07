import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Creature } from 'src/app/models/creature.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-famille-creature',
  templateUrl: './famille-creature.component.html',
  styleUrls: ['./famille-creature.component.scss']
})
export class FamilleCreatureComponent implements OnInit {

  name! : string;
  creatures!: Creature[] ;

  displayedColumns: string[] = ['name', 'gene_id', 'rare_niveau'];
  dataSource : any;

  idColor : String = 'bfa';

  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private _extService : ExtService, private client : HttpClient, private _route : ActivatedRoute) { }

  private _id: number = 8;
  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  ngOnInit(): void {
    this.name = this._route.snapshot.params['name'];
    this._extService.genChange.subscribe({
      next : id => { this.loadData(); }
    } );
  }

  private loadData(){
    this.client.get<Creature[]>(environment.base_api_url +'/creature/gen/'+ this.id+'/famille/'+ this.name )
    .subscribe({
      next: data => { console.log(data); this.creatures = data;
        this.dataSource = new MatTableDataSource<Creature>(data);
        this.dataSource.paginator = this.paginator; }, 
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

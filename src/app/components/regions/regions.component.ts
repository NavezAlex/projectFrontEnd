import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {

  regions!: Region[] ;
  selected! : string;

  constructor(private _extService : ExtService, private client : HttpClient) { }

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  ngOnInit(): void {
    this._extService.genChange.subscribe({
      next : id => {this.loadData(); this.selected=""; }
    } );
  }

  private loadData(){
    this.client.get<Region[]>(environment.base_api_url + '/region/gen/' + this.id )
      .subscribe({
        next: data => { this.regions = data; }, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
  }

  saveRegion(rgn : string){
    //console.log(rgn + " sauvé !");
    sessionStorage.setItem("rgn", rgn);
  }
  

}

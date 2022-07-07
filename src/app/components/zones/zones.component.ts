import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';
import { Zone } from 'src/app/models/zone.model';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {

  zones!: Zone[] ;
  selected! : string;
  nameRegion! : string;

  constructor(private _extService : ExtService, private client : HttpClient, private _route : ActivatedRoute) { }

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  ngOnInit(): void {
    this.nameRegion = this._route.snapshot.params['name'];
    this._extService.genChange.subscribe({
      next : id => {this.loadData(); this.selected=''; }
    } );
  }

  private loadData(){
    if(this.nameRegion){
      this.client.get<Zone[]>(environment.base_api_url + '/zone/gen/'+ this.id +'/region/' + this.nameRegion )
      .subscribe({
        next: data => { this.zones = data; }, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
    }
    else{
      this.client.get<Zone[]>(environment.base_api_url + '/zone/gen/' + this.id )
      .subscribe({
        next: data => { this.zones = data; }, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
    }
  }

}

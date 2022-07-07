import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilleZone } from 'src/app/models/familleZone.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-famille-zone',
  templateUrl: './famille-zone.component.html',
  styleUrls: ['./famille-zone.component.scss']
})
export class FamilleZoneComponent implements OnInit {

  nameZone! : string;
  famillesZone!: FamilleZone[] ;

  constructor(private _extService : ExtService, private client : HttpClient, private _route : ActivatedRoute) { }

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  get rgn() : string {
    return sessionStorage.getItem("rgn") ?? "";
  }

  ngOnInit(): void {
    this.nameZone = this._route.snapshot.params['name'];
    //console.log(this.nameZone);
    this._extService.genChange.subscribe({
      next : id => { this.loadData(); }
    } );
  }

  private loadData(){
    this.client.get<FamilleZone[]>(environment.base_api_url +'/famille/zone/'+ this.nameZone )
    .subscribe({
      next: data => { this.famillesZone = data; }, 
      error: error => { console.log("erreur de connexion") }, 
      complete: () => {}  
    });
  }

}

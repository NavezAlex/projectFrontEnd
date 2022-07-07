import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { extens } from 'src/app/data/extentions';
import { Creature } from 'src/app/models/creature.model';
import { Famille } from 'src/app/models/famille.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent implements OnInit {

  public registerForm! : FormGroup;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  familles!: Famille[];
  public extents: any[] = extens;

  creatureToUpdate! : Creature;
  private index! : number;

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  constructor(
    private _extService : ExtService, 
    private _fb : FormBuilder, 
    private client: HttpClient, 
    private _router : Router, 
    private _route : ActivatedRoute) {}

  ngOnInit(): void {
    this.index = parseInt(this._route.snapshot.params['index']);

    const optionRequete = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };

    this.registerForm = this._fb.group(
      { nom_Famille : ['Araignée'],
      name : [null, [Validators.required]],
      gene_id : ['1'],
      rare_niveau : ['1']
      }
    );

    this.client.get<Creature>(environment.base_api_url + '/creature/id/' + this.index )
    .subscribe({
      next: data => {
        this.registerForm.patchValue(data);
      }
      });

    this._extService.genChange.subscribe({
      next : id => {this.loadData(); }
    } );
  }

  private loadData(){
    this.client.get<Famille[]>(environment.base_api_url + '/famille/gen/' + this.id )
      .subscribe({
        next: data => { this.familles = data; }, 
        error: error => { console.log("erreur de connexion") }, 
        complete: () => {}  
      });
  }


  public updateBeast() : void {
    const optionRequete = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    
    if(this.registerForm.valid){

      this.client.put<Creature>(environment.base_api_url + '/creature/update/' + this.index, this.registerForm.value)
      .subscribe(() => console.log('Update OK'));
      this._router.navigate(['/admin']);
    }
    else{ 
      console.log('Formulaire Incorrect');
      console.log(this.registerForm.value);
    }
  }

}

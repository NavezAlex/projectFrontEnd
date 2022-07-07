import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { extens } from 'src/app/data/extentions';
import { Creature } from 'src/app/models/creature.model';
import { Famille } from 'src/app/models/famille.model';
import { ExtService } from 'src/app/services/ext.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {

  public registerForm! : FormGroup;

  familles!: Famille[];
  public extents: any[] = extens;

  get id() : number {
    return Number.parseInt(localStorage.getItem("genId") ?? "8");
  }

  constructor(private _extService : ExtService, private _fb : FormBuilder, private client: HttpClient, private _router : Router, private _route : ActivatedRoute) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group(
      { nom_Famille : ['Araignée'],
        name : [null, [Validators.required]],
        gene_id : ['1'],
        rare_niveau : ['1']
      }
    );

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

  public addBeast() : void {
    if(this.registerForm.valid){
      this.client.post(environment.base_api_url + '/creature', this.registerForm.value)
          //Attention subscribe est obligatoire pour l'envoi d'une requête
          .subscribe({ next: data => {
            console.log('Enregistrement OK');
            this._router.navigate(['/admin']);
            }, error: error => {
              console.log('Enregistrement n\'a pas fonctionné');
            }  
          });
      // console.log('Formulaire Correct');
      // console.log(this.registerForm.value);
    }
    else{ 
      console.log('Formulaire Incorrect');
      console.log(this.registerForm.value);
      
    }
  }

}

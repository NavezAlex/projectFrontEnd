import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Creature } from '../models/creature.model';

@Injectable({
  providedIn: 'root'
})
export class ExtService {

  id : number = Number.parseInt(localStorage.getItem("genId") ?? "8");

  genChange: BehaviorSubject<number> = new BehaviorSubject<number>(8);
  creatures!: Creature[];

  constructor( private route: ActivatedRoute, private client : HttpClient ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    localStorage.setItem("genId", (this.id).toString());
  }

  updateGen(){
    this.genChange.next(this.id);
  }

  setGen(id : number){
    this.id = id;
    localStorage.setItem("genId", (this.id).toString());
    this.updateGen();
  }

  getGen(){
    this.updateGen();
    return this.id;
  }

}

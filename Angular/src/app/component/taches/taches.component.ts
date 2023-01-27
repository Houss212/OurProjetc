import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})

export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  taches1: Array<Tache> = [];
  taches2: Array<Tache> = [];
  taches3: Array<Tache> = [];


  newTache: Tache = {
    titre: '',
    termine: false,
    status:''
  };

  newTache1: Tache = {
    titre: '',
    termine: false,
    status:''
  };

  newTache2: Tache = {
    titre: '',
    termine: false,
    status:''
  };

  newTache3: Tache = {
    titre: '',
    termine: false,
    status:''
  };
  
  filter : string = "Tous";

  constructor(private tacheService: TachesService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.tacheService.getTaches().subscribe({
      next: (data: Array<Tache>) => { this.taches = data; }
    });
  }
  ajouter() {
    this.newTache.status="indefinie"
    this.tacheService.ajoutTaches(this.newTache).subscribe({
      next: (data) => { 
        this.taches.push(data);
      }
    });
  }

  ajouter1() {
    this.newTache1.status="indefinie"
    this.tacheService.ajoutTaches(this.newTache1).subscribe({
      next: (data) => { 
        this.taches1.push(data);
      }
    });
  }
  ajouter2() {
    this.newTache2.status="indefinie"
    this.tacheService.ajoutTaches(this.newTache2).subscribe({
      next: (data) => { 
        this.taches2.push(data);
      }
    });
  }
  ajouter3() {
    this.newTache3.status="indefinie"
    this.tacheService.ajoutTaches(this.newTache3).subscribe({
      next: (data) => { 
        
        this.taches3.push(data);
      }
    });
  }

  supprimer(tache: Tache) {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches = this.taches.filter(e => tache._id != e._id);
      }
    });
  }

  supprimer1(tache: Tache) {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches1 = this.taches1.filter(e => tache._id != e._id);
      }
    });
  }

  supprimer2(tache: Tache) {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches2 = this.taches2.filter(e => tache._id != e._id);
      }
    });
  }

  supprimer3(tache: Tache) {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches3 = this.taches3.filter(e => tache._id != e._id);
      }
    });
  }
  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache);
  }
  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
  change(value : string){
    this.filter = value;
  }

 }
  


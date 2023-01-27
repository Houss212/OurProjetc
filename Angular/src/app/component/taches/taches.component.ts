// import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Tache } from 'src/app/model/tache';
// import { TachesService } from 'src/app/service/taches.service';
// import { UserService } from 'src/app/service/user.service';

// @Component({
//   selector: 'app-taches',
//   templateUrl: './taches.component.html',
//   styleUrls: ['./taches.component.css']
// })

// export class TachesComponent implements OnInit {
//   taches: Array<Tache> = [];
//   taches1: Array<Tache> = [];
//   taches2: Array<Tache> = [];
//   taches3: Array<Tache> = [];


//   newTache: Tache = {
//     titre: '',
//     termine: false,
//     status:''
//   };

//   newTache1: Tache = {
//     titre: '',
//     termine: false,
//     status:''
//   };

//   newTache2: Tache = {
//     titre: '',
//     termine: false,
//     status:''
//   };

//   newTache3: Tache = {
//     titre: '',
//     termine: false,
//     status:''
//   };
  
//   filter : string = "Tous";

//   constructor(private tacheService: TachesService, private router: Router, private userService: UserService) { }

//   ngOnInit() {
//     this.tacheService.getTaches().subscribe({
//       next: (data: Array<Tache>) => { this.taches = data; }
//     });
//   }
//   ajouter() {
//     this.newTache.status="indefinie"
//     this.tacheService.ajoutTaches(this.newTache).subscribe({
//       next: (data) => { 
//         this.taches.push(data);
//       }
//     });
//   }

//   ajouter1() {
//     this.newTache1.status="indefinie"
//     this.tacheService.ajoutTaches(this.newTache1).subscribe({
//       next: (data) => { 
//         this.taches1.push(data);
//       }
//     });
//   }
//   ajouter2() {
//     this.newTache2.status="indefinie"
//     this.tacheService.ajoutTaches(this.newTache2).subscribe({
//       next: (data) => { 
//         this.taches2.push(data);
//       }
//     });
//   }
//   ajouter3() {
//     this.newTache3.status="indefinie"
//     this.tacheService.ajoutTaches(this.newTache3).subscribe({
//       next: (data) => { 
        
//         this.taches3.push(data);
//       }
//     });
//   }

//   supprimer(tache: Tache) {
//     this.tacheService.removeTaches(tache).subscribe({
//       next: (data) => {
//         this.taches = this.taches.filter(e => tache._id != e._id);
//       }
//     });
//   }

//   supprimer1(tache: Tache) {
//     this.tacheService.removeTaches(tache).subscribe({
//       next: (data) => {
//         this.taches1 = this.taches1.filter(e => tache._id != e._id);
//       }
//     });
//   }

//   supprimer2(tache: Tache) {
//     this.tacheService.removeTaches(tache).subscribe({
//       next: (data) => {
//         this.taches2 = this.taches2.filter(e => tache._id != e._id);
//       }
//     });
//   }

//   supprimer3(tache: Tache) {
//     this.tacheService.removeTaches(tache).subscribe({
//       next: (data) => {
//         this.taches3 = this.taches3.filter(e => tache._id != e._id);
//       }
//     });
//   }
//   modifier(tache: Tache) {
//     tache.termine = !tache.termine;
//     this.tacheService.updateTaches(tache);
//   }
//   loggout() {
//     this.userService.logout().subscribe(() => {
//       this.router.navigate(['']);
//     })
//   }
//   change(value : string){
//     this.filter = value;
//   }

//  }
  





 import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Tache, ListeTaches } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})

export class TachesComponent implements OnInit {

  ListeT: string = "";

  baseStatuts: Array<string> = [];

  baseListeTaches: Array<ListeTaches> = [];


  constructor(private tacheService: TachesService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.tacheService.getTaches().subscribe({ 
      next: (listeTaches) => {
        listeTaches.forEach((tache, index) => {
          if (index == 0) {
            this.baseStatuts.push(tache.status);
          }
          else {
            let cpt = 0;
            this.baseStatuts.forEach(status => { 
              if (tache.status == status) {
                cpt++;
              }
            });
            if (cpt == 0) {
              this.baseStatuts.push(tache.status);
            }
          }
        });

        
        this.baseStatuts.forEach(status => {
          console.log("OK");
          let newListeListeTaches: ListeTaches = { 
            ListeT: status,
            TacheT: "",
            taches: []
          }

          this.tacheService.getTaches().subscribe({
            next: (listeTaches) => {
              let listeTachesFiltred = listeTaches.filter(tache => tache.status == status);
              newListeListeTaches.taches = listeTachesFiltred;
              this.baseListeTaches.push(newListeListeTaches);
            }
          });
        });
      }
    });
  }






  ajouterListeTaches() {
    let newListeListeTaches: ListeTaches = { 
      ListeT: "",
      TacheT: "",
      taches: []
    }

    let listeExisteDeja = this.baseListeTaches.filter(liste => liste.ListeT == this.ListeT);
    if (listeExisteDeja.length == 0) { 
      this.tacheService.getTaches().subscribe({
        next: (listeTaches) => {
          let listeTachesFiltred = listeTaches.filter(tache => tache.status == this.ListeT);
          newListeListeTaches.taches = listeTachesFiltred;
          newListeListeTaches.ListeT = this.ListeT;
          if (listeTachesFiltred.length == 0) { 
            this.baseListeTaches.push(newListeListeTaches);
          }
        }
      });
    }

  }

  ajouterTache(listeTaches: ListeTaches) {
    let newTache: Tache = { 
      titre: listeTaches.TacheT,
      termine: false,
      status: listeTaches.ListeT
    };
    this.tacheService.ajoutTaches(newTache).subscribe({
      next: (data) => {
        this.baseListeTaches.forEach(liste => {
          if (liste.ListeT == listeTaches.ListeT) {
            liste.taches.push(data);
          }
        })
      }
    });
  }

  supprimerListeTache(listeTaches: ListeTaches) {
    listeTaches.taches.forEach(tache => {
      this.tacheService.removeTaches(tache).subscribe({});
    });
    this.baseListeTaches = this.baseListeTaches.filter(liste => liste.ListeT != listeTaches.ListeT);
  }

  supprimerTache(listeTaches: ListeTaches, tache: Tache) {
    this.tacheService.removeTaches(tache).subscribe({
      next: () => {
        listeTaches.taches = listeTaches.taches.filter(e => tache._id != e._id);
      }
    });
  }

  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache).subscribe({});
  }
  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

  drop(event: CdkDragDrop<Array<Tache>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    event.item.data.status = event.container.data[0].status;
    this.tacheService.updateTaches(event.item.data).subscribe({});
  }
}
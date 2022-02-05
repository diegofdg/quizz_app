import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {
  suscriptionUser: Subscription = new Subscription();
  listCuestionarios: Cuestionario[] = [];
  
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private _quizzService: QuizzService
  ) { }

  ngOnInit(): void {
    this.suscriptionUser = this.afAuth.user.subscribe(user => {
      console.log(user);
      if (user && user.emailVerified) {
        this.getCuestionarios(user.uid);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy(): void {
    this.suscriptionUser.unsubscribe();
  }

  getCuestionarios(uid: string) {
    this._quizzService.getCuestionarioByIdUser(uid).subscribe(data => {
       this.listCuestionarios = [];
       data.forEach((element:any) => {
         this.listCuestionarios.push({
           id: element.payload.doc.id,
           ...element.payload.doc.data()
         })
       });
       console.log(this.listCuestionarios);
     });
   }
}

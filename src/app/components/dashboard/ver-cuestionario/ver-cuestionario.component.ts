import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css']
})
export class VerCuestionarioComponent implements OnInit {
  id: string;

  constructor(private _quizzService: QuizzService, private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.obtenerQuizz();
  }

  obtenerQuizz() {
    this._quizzService.getCuestionario(this.id).subscribe({
      next: (responseOK) => {
        console.log(responseOK.data());        
      },
      error: (responseFail) => {
        console.log(responseFail);        
      }
    });
  }
}

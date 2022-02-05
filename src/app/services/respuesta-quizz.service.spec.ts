import { TestBed } from '@angular/core/testing';

import { RespuestaQuizzService } from './respuesta-quizz.service';

describe('RespuestaQuizzService', () => {
  let service: RespuestaQuizzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaQuizzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

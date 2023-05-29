import { TestBed } from '@angular/core/testing';

import { ExamSolutionService } from './exam-solution.service';

describe('ExamSolutionService', () => {
  let service: ExamSolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamSolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

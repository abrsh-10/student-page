import { TestBed } from '@angular/core/testing';

import { ExamService } from '../services/exam.service';

describe('ExamService', () => {
  let service: ExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TopicService } from '../services/topic.service';

describe('TopicService', () => {
  let service: TopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NewFeedService } from './new-feed.service';

describe('NewFeedService', () => {
  let service: NewFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

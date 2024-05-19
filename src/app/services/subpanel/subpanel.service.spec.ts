import { TestBed } from '@angular/core/testing';

import { SubpanelService } from './subpanel.service';

describe('SubpanelService', () => {
  let service: SubpanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubpanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

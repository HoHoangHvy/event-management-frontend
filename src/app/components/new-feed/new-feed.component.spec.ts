import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedComponent } from './new-feed.component';

describe('NewFeedComponent', () => {
  let component: NewFeedComponent;
  let fixture: ComponentFixture<NewFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

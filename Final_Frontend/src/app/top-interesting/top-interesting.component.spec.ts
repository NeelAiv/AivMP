import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInterestingComponent } from './top-interesting.component';

describe('TopInterestingComponent', () => {
  let component: TopInterestingComponent;
  let fixture: ComponentFixture<TopInterestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopInterestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInterestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

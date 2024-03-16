import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCHWidgetsComponent } from './lchwidgets.component';

describe('LCHWidgetsComponent', () => {
  let component: LCHWidgetsComponent;
  let fixture: ComponentFixture<LCHWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LCHWidgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LCHWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

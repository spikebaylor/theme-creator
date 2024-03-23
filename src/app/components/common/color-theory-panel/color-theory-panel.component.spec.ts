import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTheoryPanelComponent } from './color-theory-panel.component';

describe('ColorTheoryPanelComponent', () => {
  let component: ColorTheoryPanelComponent;
  let fixture: ComponentFixture<ColorTheoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorTheoryPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorTheoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

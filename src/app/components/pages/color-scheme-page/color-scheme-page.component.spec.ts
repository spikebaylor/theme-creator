import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemePageComponent } from './color-scheme-page.component';

describe('ColorSchemePageComponent', () => {
  let component: ColorSchemePageComponent;
  let fixture: ComponentFixture<ColorSchemePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSchemePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorSchemePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

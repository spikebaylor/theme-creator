import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTheorySwatches } from './color-theory-swatches.component';

describe('ComplimentChooserComponent', () => {
  let component: ColorTheorySwatches;
  let fixture: ComponentFixture<ColorTheorySwatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorTheorySwatches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorTheorySwatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

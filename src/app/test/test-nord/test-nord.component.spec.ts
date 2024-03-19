import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNordComponent } from './test-nord.component';

describe('TestNordComponent', () => {
  let component: TestNordComponent;
  let fixture: ComponentFixture<TestNordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestNordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLocalStorageComponent } from './test-local-storage.component';

describe('TestLocalStorageComponent', () => {
  let component: TestLocalStorageComponent;
  let fixture: ComponentFixture<TestLocalStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLocalStorageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestLocalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

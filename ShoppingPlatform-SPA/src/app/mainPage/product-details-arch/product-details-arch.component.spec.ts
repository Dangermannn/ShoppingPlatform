import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsArchComponent } from './product-details-arch.component';

describe('ProductDetailsArchComponent', () => {
  let component: ProductDetailsArchComponent;
  let fixture: ComponentFixture<ProductDetailsArchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsArchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

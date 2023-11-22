import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousRegionsComponent } from './sous-regions.component';

describe('SousRegionsComponent', () => {
  let component: SousRegionsComponent;
  let fixture: ComponentFixture<SousRegionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousRegionsComponent]
    });
    fixture = TestBed.createComponent(SousRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

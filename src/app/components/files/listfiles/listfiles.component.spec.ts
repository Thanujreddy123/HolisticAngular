import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfilesComponent } from './listfiles.component';

describe('ListfilesComponent', () => {
  let component: ListfilesComponent;
  let fixture: ComponentFixture<ListfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

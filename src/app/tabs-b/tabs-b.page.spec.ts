import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsBPage } from './tabs-b.page';

describe('TabsBPage', () => {
  let component: TabsBPage;
  let fixture: ComponentFixture<TabsBPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

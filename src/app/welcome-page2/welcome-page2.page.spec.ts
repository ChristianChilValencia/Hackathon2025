import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePage2Page } from './welcome-page2.page';

describe('WelcomePage2Page', () => {
  let component: WelcomePage2Page;
  let fixture: ComponentFixture<WelcomePage2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePage2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

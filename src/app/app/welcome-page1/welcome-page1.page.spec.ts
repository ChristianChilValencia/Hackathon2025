import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePage1Page } from './welcome-page1.page';

describe('WelcomePage1Page', () => {
  let component: WelcomePage1Page;
  let fixture: ComponentFixture<WelcomePage1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePage1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

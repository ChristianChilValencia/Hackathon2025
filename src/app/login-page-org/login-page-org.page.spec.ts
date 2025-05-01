import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageOrgPage } from './login-page-org.page';

describe('LoginPageOrgPage', () => {
  let component: LoginPageOrgPage;
  let fixture: ComponentFixture<LoginPageOrgPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

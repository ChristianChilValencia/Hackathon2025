import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileOrganizationPage } from './profile-organization.page';

describe('ProfileOrganizationPage', () => {
  let component: ProfileOrganizationPage;
  let fixture: ComponentFixture<ProfileOrganizationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrganizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

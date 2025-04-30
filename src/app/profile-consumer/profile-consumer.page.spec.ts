import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileConsumerPage } from './profile-consumer.page';

describe('ProfileConsumerPage', () => {
  let component: ProfileConsumerPage;
  let fixture: ComponentFixture<ProfileConsumerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConsumerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

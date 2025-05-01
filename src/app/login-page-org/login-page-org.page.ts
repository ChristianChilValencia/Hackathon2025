import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page-org',
  templateUrl: './login-page-org.page.html',
  styleUrls: ['./login-page-org.page.scss'],
  standalone: false
})
export class LoginPageOrgPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    // Handle sign-in logic here
    this.navigateToProfileConsumer();
  }

  navigateToProfileConsumer() {
    this.router.navigate(['profile-consumer']);
  }
}

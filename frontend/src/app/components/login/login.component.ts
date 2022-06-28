import { Component, OnInit } from '@angular/core';
import { MetamaskService } from '../../services/metamask.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public metamaskService: MetamaskService) { }

  ngOnInit(): void {
  }
  login(){
    this.metamaskService.signInWithMetaMask();
  }
}

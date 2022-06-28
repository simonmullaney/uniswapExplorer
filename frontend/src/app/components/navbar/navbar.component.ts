import { Component, OnInit } from '@angular/core';
import { MetamaskService } from '../../services/metamask.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public metamaskService: MetamaskService) { }

  ngOnInit(): void {
  }



}

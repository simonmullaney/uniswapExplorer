import { Component, OnInit } from '@angular/core';
import {UniswapService} from '../../services/uniswap.service'
import {MetamaskService} from '../../services/metamask.service'

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  constructor(
    public uniswapService: UniswapService,
    public metamaskService: MetamaskService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('jwt')
  }

}

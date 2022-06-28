import { Component, OnInit } from '@angular/core';
import {UniswapService} from '../../services/uniswap.service'

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  constructor(public uniswapService: UniswapService) { }

  ngOnInit(): void {
    localStorage.removeItem('jwt')
  }

}

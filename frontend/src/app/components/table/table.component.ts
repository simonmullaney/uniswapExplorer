import { Component, OnInit } from '@angular/core';
import {UniswapService} from '../../services/uniswap.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(public uniswapService: UniswapService) { }

  ngOnInit(): void {
    this.uniswapService.getUniswapData()
  }

}

import { Component, OnInit } from '@angular/core';
import {UniswapService} from '../../services/uniswap.service'

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css']
})
export class TransactionModalComponent implements OnInit {

  constructor(public uniswapService: UniswapService) { }

  ngOnInit(): void {
  }
}

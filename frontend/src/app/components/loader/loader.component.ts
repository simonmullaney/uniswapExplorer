import { Component, OnInit } from '@angular/core';
import { UniswapService } from '../../services/uniswap.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(public uniswapService: UniswapService) { }

  ngOnInit(): void {
  }

}

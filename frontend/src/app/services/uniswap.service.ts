import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from './../config.json';



@Injectable({
  providedIn: 'root'
})
export class UniswapService {
  uniswapTableData:any;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUniswapData(){
    let __this = this;
    console.log("Getting uniswap data...");
    return this.httpClient.get(config.apiUrl + '/uniswap')
    .toPromise()
    .then((response: any) => {
      __this.uniswapTableData = response.data;
      console.log("__this.uniswapTableData: ", __this.uniswapTableData);
    })
  }
}

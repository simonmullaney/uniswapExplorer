import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from './../config.json'; 



@Injectable({
  providedIn: 'root'
})
export class UniswapService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUniswapData(){
    console.log("Getting uniswap data...");
    return this.httpClient.get(config.apiUrl + '/uniswap')
    .toPromise()
    .then((response: any) => {
      console.log("response: ", response);
    })
  }
}

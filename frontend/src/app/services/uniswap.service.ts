import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import config from './../config.json';

@Injectable({
  providedIn: 'root'
})
export class UniswapService {
  uniswapTableData:any;
  uniswapTableArguments:any;
  showTransactionModal:boolean = false;
  eventType:any;
  transactionArg:any;
  loading:boolean = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  //function to get uniswap data from API
  getUniswapData(){
    let __this = this;
    this.loading =true;
    let jwt = localStorage.getItem('jwt')
    const headers = new HttpHeaders({'Authorization':`Bearer ${jwt}`});

    return this.httpClient.get(config.apiUrl + '/uniswap',{headers:headers})
    .toPromise()
    .then((response: any) => {
      __this.loading = false;
      __this.uniswapTableData = response.data.transferEvents;
      __this.uniswapTableArguments = response.data.transactionArgumentArr;
    })
  }
  //function to show modal
  showModal(txArg:any,txType:any){
    this.showTransactionModal=true;
    this.eventType = txType;
    this.transactionArg = txArg;
  }
  //function to close modal
  closeModal(){
    this.showTransactionModal=false;
  }
}

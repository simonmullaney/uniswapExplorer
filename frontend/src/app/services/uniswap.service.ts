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

  constructor(
    private httpClient: HttpClient
  ) { }

  getUniswapData(){
    let __this = this;
    console.log("Getting uniswap data...");

    // console.log(this.metamaskService.jwt);
    let jwt = localStorage.getItem('jwt')

    console.log(`Bearer ${jwt}`);
    const headers = new HttpHeaders({'Authorization':`Bearer ${jwt}`});

    console.log(headers);

    return this.httpClient.get(config.apiUrl + '/uniswap',{headers:headers})
    .toPromise()
    .then((response: any) => {
      __this.uniswapTableData = response.data.transferEvents;
      __this.uniswapTableArguments = response.data.transactionArgumentArr;
      console.log("response",response);
      console.log("response.data.transactionArgumentArr",response.data.transactionArgumentArr);
      console.log("__this.uniswapTableData: ", __this.uniswapTableData);
    })
  }

  showModal(txArg:any,txType:any){
    console.log("Showing modal: ",txArg);
    this.showTransactionModal=true;
    this.eventType = txType;
    this.transactionArg = txArg;
    console.log(this.showTransactionModal);
  }
  closeModal(){
    this.showTransactionModal=false;
  }
}

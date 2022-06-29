import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import detectEthereumProvider from '@metamask/detect-provider';
import config from './../config.json';
import {UniswapService} from './uniswap.service'


@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  nonce:any;
  jwt:string = '';

  constructor(private httpClient: HttpClient, private uniswapService: UniswapService) { }

  public async signInWithMetaMask() {
    console.log("signInWithMetaMask");
    let __this = this;
    try {
      // return from(detectEthereumProvider()).pipe(
        // Step 1: Request (limited) access to users ethereum account
        const provider :any = await detectEthereumProvider()
        if (provider) {
          console.log('Ethereum successfully detected!')
          const chainId = await provider.request({
            method: 'eth_requestAccounts'
          })
        } else {
          // if the provider is not detected, detectEthereumProvider resolves to null
          throw new Error('Please install MetaMask');
        }


        // Step 2: Retrieve the current nonce for the requested address
        await this.httpClient.get(config.apiUrl + '/auth/nonce/' +provider.selectedAddress)
        .toPromise()
        .then((response: any) => {
          console.log(response);
          __this.nonce = response.data.toString()
        })

      // Step 3: Get the user to sign the nonce with their private key
      let signature = await provider.request({
              method: 'personal_sign',
              params: [
                `0x${this.toHex(__this.nonce)}`,
                provider.selectedAddress,
              ],
            })
      console.log("Signature: ",signature);
      console.log("Provider.selectedAddress: ", provider.selectedAddress);

      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');
      const body = { address: provider.selectedAddress, signature: signature };

      console.log(body);


      // Step 4: If the signature is valid, retrieve a custom auth token
      await this.httpClient.post(config.apiUrl + '/auth/token',body,{headers:headers})
      .toPromise()
      .then((response: any) => {
        console.log(response);
        localStorage.setItem('jwt',response.data)
        __this.uniswapService.getUniswapData()
      })
    } catch (error) {
      console.log(error);
      return
    }

      }

  private toHex(stringToConvert: string) {
    console.log("Converting to hex: ",stringToConvert);

    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

  public isLoggedIn(){
    if(localStorage.getItem('jwt')){
      return true
    }else{
      return false
    }
  }

  public logout(){
    localStorage.removeItem('jwt');
    this.uniswapService.uniswapTableData = [];
    this.uniswapService.uniswapTableArguments = [];
  }

}

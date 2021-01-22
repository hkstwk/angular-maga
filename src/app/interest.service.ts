import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InterestService {

  constructor(private http: HttpClient) { }

  getInterestRates(interestPeriod: string){
    return this.http.get('https://my-json-server.typicode.com/tdijkmans/MAGAPI/' + interestPeriod)
  }

}
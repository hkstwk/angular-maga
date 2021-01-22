import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { InterestService } from "../interest.service";

@Component({
  selector: "app-interest-rates",
  templateUrl: "./interest-rates.component.html",
  styleUrls: ["./interest-rates.component.css"]
})
export class InterestRatesComponent implements OnInit {
  rates = [];

  interestRateList;
  //   interestRateList = [
  //    {
  //       "rateClass":"NHG",
  //       "rate":"1"
  //    },
  //    {
  //       "rateClass":"t/m 67,50% MW",
  //       "rate":"1.3"
  //    },
  //    {
  //       "rateClass":"t/m 81% MW",
  //       "rate":"1.5"
  //    },
  //    {
  //       "rateClass":"meer dan 81%",
  //       "rate":"1.8"
  //    }
  // ]

  constructor(
    private http: HttpClient,
    private interestService: InterestService
  ) {}

  ngOnInit() {
    this.interestService.getInterestRates().subscribe(interestRates => {
      this.interestRateList = interestRates;
    });

    this.http
      .get<any>("https://my-json-server.typicode.com/tdijkmans/MAGAPI/1_jaar")
      .subscribe(resp => {
        this.rates = resp;
        console.log(JSON.stringify(resp));
      });
  }
}

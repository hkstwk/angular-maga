import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { InterestService } from "../interest.service";

interface InterestData {
  id: number;
  Hypotheek: string;
  NHG: number;
  "60%": number;
  "80%": number;
  "100%": number;
}

@Component({
  selector: "app-interest-rates",
  templateUrl: "./interest-rates.component.html",
  styleUrls: ["./interest-rates.component.css"]
})
export class InterestRatesComponent implements OnInit {
  interestRateList: InterestData[] = [];
  private interestRateListUnFiltered: InterestData[] = [];
  searchValue: string = "";

  constructor(
    private http: HttpClient,
    private interestService: InterestService
  ) {}

  ngOnInit() {
    this.getInterestRates("1_jaar");
  }

  getInterestRates(period: string) {
    this.interestService
      .getInterestRates(period)
      .subscribe((interestRates: InterestData[]) => {
        for (let rate of interestRates) {
          this.interestRateList.push(rate);
        }
        // Copy interestRate[] to unfiltered []
        this.interestRateListUnFiltered = this.interestRateList.slice();
        // apply filter
        if (this.searchValue != "") {
          console.log("applying filter");
          this.applyFilter();
        }
      });
  }

  changePeriod(event) {
    this.interestRateList = [];
    this.getInterestRates(event.target.value);
  }

  private applyFilter() {
    // restore unfiltered []
    this.interestRateList = this.interestRateListUnFiltered.slice();

    // apply filter
    this.interestRateList = this.interestRateList.filter(
      (interestData: InterestData) => {
        return interestData.Hypotheek.toLowerCase().includes(
          this.searchValue.toLowerCase()
        );
      }
    );
  }

  onSearchChange(event) {
    this.searchValue = event.target.value;
    this.applyFilter();
  }
}

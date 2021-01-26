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
  filteredRateList: InterestData[] = [];
  searchValue: string = "";
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private interestService: InterestService
  ) {}

  ngOnInit() {
    this.getInterestRates("1_jaar");
  }

  getInterestRates(period: string) {
    this.loading = true;

    this.interestService
      .getInterestRates(period)
      .subscribe((interestRates: InterestData[]) => {
        this.interestRateList = interestRates;
        this.applyFilter();
        this.loading = false;
      });
  }

  changePeriod(event) {
    this.getInterestRates(event.target.value);
  }

  private applyFilter() {
    this.filteredRateList = this.interestRateList.filter(
      (interestData: InterestData) =>
        interestData.Hypotheek.toLowerCase().includes(
          this.searchValue.toLowerCase()
        )
    );
  }

  onSearchChange(event) {
    this.searchValue = event.target.value;
    this.applyFilter();
  }
}

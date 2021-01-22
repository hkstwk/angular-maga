import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { InterestService } from "../interest.service";

@Component({
  selector: "app-interest-rates",
  templateUrl: "./interest-rates.component.html",
  styleUrls: ["./interest-rates.component.css"]
})
export class InterestRatesComponent implements OnInit {
  interestRateList;
  search: string = '';

  constructor(
    private http: HttpClient,
    private interestService: InterestService
  ) {}

  ngOnInit() {
    this.getInterestRates("1_jaar");
  }

  getInterestRates(period: string) {
    this.interestService.getInterestRates(period).subscribe(interestRates => {
      this.interestRateList = interestRates;
    });
  }

  changePeriod(event) {
    this.getInterestRates(event.target.value);
    this
  }

  onSearchChange(event){
    let searchValue =  event.target.value;
    console.log(searchValue);
    // this.interestRateList = 
    this.interestRateList.filter(item =>​
      item.Hypotheek.toLowerCase().includes(searchValue.toLowerCase())​
    );​
  }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InterestRatesComponent } from "./interest-rates/interest-rates.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { InterestService } from './interest.service';

@NgModule({
  declarations: [
    AppComponent,
    
    DashboardComponent,
    InterestRatesComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [InterestService]
})
export class AppModule {}

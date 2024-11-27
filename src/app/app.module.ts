import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisasterAlertsComponent } from './disaster-alerts/disaster-alerts.component';
import { SheltersComponent } from './shelters/shelters.component'; // Check the path
import { HelpRequestsComponent } from './help-requests/help-requests.component';
import { DonationCampaignsComponent } from './donation-campaigns/donation-campaigns.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    DisasterAlertsComponent,
    SheltersComponent,
    HelpRequestsComponent,
    DonationCampaignsComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Ensure FormsModule is imported
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

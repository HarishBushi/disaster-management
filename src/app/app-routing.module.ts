import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisasterAlertsComponent } from './disaster-alerts/disaster-alerts.component';
import { SheltersComponent } from './shelters/shelters.component'; // Check the path
import { HelpRequestsComponent } from './help-requests/help-requests.component';
import { DonationCampaignsComponent } from './donation-campaigns/donation-campaigns.component';

const routes: Routes = [
  { path: 'disaster-alerts', component: DisasterAlertsComponent },
  { path: 'shelters', component: SheltersComponent },
  { path: 'help-requests', component: HelpRequestsComponent },
  { path: 'donation-campaigns', component: DonationCampaignsComponent },
  { path: '', redirectTo: '/disaster-alerts', pathMatch: 'full' },
  { path: '**', redirectTo: '/disaster-alerts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { Oscilloscope } from './components/oscilloscope/oscilloscope';


// Set default routes to oscilloscope component
export const routes: Routes = [
  { path: '', redirectTo: 'oscilloscope', pathMatch: 'full' },
  { path: 'oscilloscope', component: Oscilloscope }
];

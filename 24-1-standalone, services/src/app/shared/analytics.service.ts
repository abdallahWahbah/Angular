import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
@Injectable() // if you din't inject this service to the root like above, provide it in the main.ts
export class AnalyticsService {
  registerClick() {
    console.log('Clicked!');
  }
}

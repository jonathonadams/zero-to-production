import { Injectable, ApplicationRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

/**
 * To use this service, add it the the constructor of AppComponent
 */
@Injectable({ providedIn: 'root' })
export class CheckForUpdatesService {
  constructor(
    appRef: ApplicationRef,
    updates: SwUpdate,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => updates.checkForUpdate());

    // updates.activated.subscribe(event => {
    //   console.log('old version was', event.previous);
    //   console.log('new version is', event.current);
    // });

    updates.available.subscribe((event) => {
      // if (promptUser(event)) {
      //   updates.activateUpdate().then(() => document.location.reload());
      // }
    });
  }

  promptUserToUpdate() {}

  forcePageReload() {
    this.document.location.reload();
  }
}

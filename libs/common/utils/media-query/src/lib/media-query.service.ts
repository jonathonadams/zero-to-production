export class MediaQueryService {
  private mql: MediaQueryList | undefined | null;
  private mqlListener: ((mql: MediaQueryListEvent) => void) | null;

  listenToMediaQuery(
    mediaQuery: string,
    listener: (matches: boolean) => void
  ): boolean | undefined {
    if (this.mql) this.removeMediaListener();
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      this.mql = mediaQueryList;

      /* Register for future events */
      this.mqlListener = (mq) => listener(mq.matches);

      if (this.mql.addEventListener as any) {
        this.mql.addEventListener('change', this.mqlListener);
      } else {
        this.mql.addListener(this.mqlListener);
      }

      return this.mql.matches;
    }
  }

  removeMediaListener() {
    if (this.mql && this.mqlListener) {
      if (this.mql.removeEventListener) {
        this.mql.removeEventListener('change', this.mqlListener);
      } else {
        this.mql.removeListener(this.mqlListener);
      }

      this.mql = this.mqlListener = null;
    }
  }
}

export interface IGuide {
  label: string;
  guide: string;
  path: string;
}

export const GUIDES: IGuide[] = [
  {
    label: 'Start Your Own',
    guide: 'START_YOUR_OWN',
    path: 'start-your-own'
  },

  {
    label: 'Firebase Hosting',
    guide: 'FIREBASE_HOSTING',
    path: 'firebase-hosting'
  },
  {
    label: 'SSR & Firebase Functions',
    guide: 'FIREBASE_SSR',
    path: 'ssr-firebase-functions'
  },
  {
    label: 'Google Cloud Kubernetes',
    guide: 'GOOGLE_CLOUD',
    path: 'google-cloud-k8s'
  }
];

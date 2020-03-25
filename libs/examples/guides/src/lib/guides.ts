export interface IGuide {
  label: string;
  guide: string;
  path: string;
}

export const GUIDES: IGuide[] = [
  {
    label: 'Getting Started',
    guide: 'GETTING_STARTED',
    path: 'getting-started',
  },
  {
    label: 'Serverless with AWS Lambda',
    guide: 'LAMBDA_FUNCTIONS',
    path: 'aws-lambda',
  },
  {
    label: 'Firebase Hosting',
    guide: 'FIREBASE_HOSTING',
    path: 'firebase-hosting',
  },
  {
    label: 'SSR & Firebase Functions',
    guide: 'FIREBASE_SSR',
    path: 'ssr-firebase-functions',
  },
  {
    label: 'Google Cloud Kubernetes',
    guide: 'GOOGLE_CLOUD',
    path: 'google-cloud-k8s',
  },
];

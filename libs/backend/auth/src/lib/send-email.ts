import sgMail from '@sendgrid/mail';
import { EmailVerificationConfig } from './auth.interface';

export function setupEmailVerification({
  sendGridApiKey,
  hostUrl
}: EmailVerificationConfig) {
  // Set the api key
  sgMail.setApiKey(sendGridApiKey);

  return async function sendVerificationEmail(to: string, token: string) {
    const msg = {
      to,
      from: 'test@z2p.com',
      subject: 'Verify Your Email',
      text: `Click on this link to verify your email ${hostUrl}/authorize/verify?token=${token}&email=${to}`
    };
    return await sgMail.send(msg);
  };
}

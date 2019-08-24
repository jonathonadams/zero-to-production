import sgMail from '@sendgrid/mail';

export function verificationEmail(API_KEY: string, hostUrl: string) {
  // Set the api key
  sgMail.setApiKey(API_KEY);

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

import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY || '';
sgMail.setApiKey(apiKey);

const params = {
    to: process.env.TO_EMAIL || '',
    from: process.env.TO_EMAIL || '', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

interface MessageParams {
    subject: string;
    text: string;
}

export const sendEmail = async ({ subject, text }: MessageParams) => {
    const msg = {
        to: params.to,
        from: params.from,
        subject,
        text,
        html: `<strong>${text}</strong>`,
    };

    try {
        console.log('SENDING EMAIL', subject);
        await sgMail.send(msg);
    } catch (e) {
        console.error(e);
        if (e.response) {
            console.error(e.response.body);
        }
    }
};

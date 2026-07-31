import { BrevoClient } from '@getbrevo/brevo'

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
})

export async function sendEmail({ to, subject, html, text }) {
    const result = await brevo.transactionalEmails.sendTransacEmail({
        subject,
        htmlContent: html,
        sender: {
            name: "Team Cognify",
            email: "onlyforfun2107@gmail.com"
        },
        to: [{
            email: to
        }]
    })
    console.log("email send to: ", to);

    console.log('Email sent. Message ID:', result.messageId);

}
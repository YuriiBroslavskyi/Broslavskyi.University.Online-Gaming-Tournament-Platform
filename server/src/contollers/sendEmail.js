const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmailNotifications = async (tournament) => {
    try {
        const users = await User.find({}); // Fetch all registered users from your database
        const userEmails = users.map(user => user.email);

        const msg = {
            to: userEmails,
            from: 'broslav25@gmail.com',
            subject: 'New Tournament Announcement',
            text: `A new tournament "${tournament.name}" has been created. Check it out!`,
            html: `<p>A new tournament "<strong>${tournament.name}</strong>" has been created. Check it out!</p>`,
        };

        await sgMail.send(msg);
        console.log('Email notifications sent successfully');
    } catch (error) {
        console.error('Error sending email notifications:', error);
    }
};
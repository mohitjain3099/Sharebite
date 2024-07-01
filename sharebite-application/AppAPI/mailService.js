import nodemailer from 'nodemailer';
import express from 'express';
const router = express.Router();

// Send email
const sendEmail = async ({ to, subject, text }) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'sharebite0@gmail.com',
            clientId: '978055880714-mileu1s3huddmno4hu8cgr2qiaomv9pi.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//043_shlsp4ym_CgYIARAAGAQSNwF-L9IrBbkHSHNdYQXwKbhGFFS2c-uDOLFr6aagKe_GAYreV0u33OuVNl8wvgyWnczPcWzYDrQ',
        },
    });

    // Send mail with defined transport object
    const mailOptions = {
        from: 'sharebite0@gmail.com',
        to,
        subject,
        text,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Send email route
router.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    sendEmail({ to, subject, text })
        .then(() => res.status(200).send('Email sent'))
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
});


export default router;
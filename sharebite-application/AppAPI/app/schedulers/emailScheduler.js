import cron from 'node-cron';
import fetch from 'node-fetch';

cron.schedule('* * * * *', async () => {
    console.log('Running a task every minute');

    try {
        // Fetch all subscribers
        const response = await fetch('http://localhost:3008/subscribers');
        const emails = await response.json();
        // Fetch all events
        const eventDataResponse = await fetch('http://localhost:3008/getAllEventData');
        const allEventData = await eventDataResponse.json();

        const eventsToSend = allEventData.filter(event => event.isPromoMailSent === 0);

        // Send emails
        for (const event of eventsToSend) {
            const emailPromises = emails.map(email => {
                const htmlBody = `
                    <h1>New Event: ${event.title}</h1>
                    <p>Check out this new event:</p>
                    <p>${event.caption}</p>
                    <p>Created At: ${new Date(event.createdAt.$date).toLocaleString()}</p>
                    <p>Author: ${event.author}</p>
                    <p>Location: ${event.location.streetName}, ${event.location.city}, ${event.location.state}</p>
                `;

                return fetch('http://localhost:3008/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: email,
                        subject: `New Event: ${event.title}`,
                        html: htmlBody,
                    }),
                });
            });

            await Promise.all(emailPromises);

            // Update event
            const response = await fetch(`http://localhost:3008/patchEventData/${event._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isPromoMailSent: 1 }),
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
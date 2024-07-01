import Swal from 'sweetalert2';
import { Constants } from './APIServiceConstants';

export const registerForEvent = async (eventRegistrationData: any) => {
    console.log('eventRegistrationDataServiceFile:', JSON.stringify(eventRegistrationData));

    try {
        const response = await fetch(`${Constants.API_URL}/eventRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventRegistrationData),
        });

        if (response.ok) {
            Swal.fire({
                title: "Registered for event successfully!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } else {
            throw new Error('Failed to save event.');
        }
    } catch (error) {
        console.error('Error saving event:', error);
        Swal.fire({
            title: "An error occurred while registering for the event. Please try again later.",
            icon: "error"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    }
}
import Swal from 'sweetalert2';
import { Constants } from './APIServiceConstants';

export const savePostData=(postData: any)=>{
    console.log('postDataServiceFile:', JSON.stringify(postData));
    fetch(`${Constants.API_URL}/medias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then((response) => {
        if (response.ok) {
            Swal.fire({
                title: "Post saved successfully!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } else {
            throw new Error('Failed to save event.');
        }
    })
    .catch((error) => {
        console.error('Error saving event:', error);
        Swal.fire({
            title: "An error occurred while saving the post. Please try again later.",
            icon: "error"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    });
}
import e from 'express';
import Swal from 'sweetalert2';
import { Constants } from './APIServiceConstants';

export const postDelete = async (id:any) => {
    const response = await fetch(`${Constants.API_URL}/medias/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (response.ok) {
            Swal.fire({
                title: "Post deleted successfully!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
        else {
            throw new Error('Failed to delete post.');
        }
    }
    ).catch((error) => {
        console.error('Error deleting post:', error);
        Swal.fire({
            title: "An error occurred while deleting the post. Please try again later.",
            icon: "error"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    });
}
export default postDelete;
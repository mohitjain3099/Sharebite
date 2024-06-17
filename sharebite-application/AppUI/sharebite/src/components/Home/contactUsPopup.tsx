import React, { Dispatch, SetStateAction, useState } from "react";
import "../../../css/contactUs.css";
import contactGraphic from "../../static/images/contactUs_graphic.png";
import Constants from "../../AppConstants";
// Define the props for the ContactUsPopup component
interface ContactUsPopupProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

// Define the ContactUsPopup component
const ContactUsPopup: React.FC<ContactUsPopupProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  // Initialize state for the form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send a POST request to the server with the form data
    const response = await fetch(`${Constants.API_URL}/contactUs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      // Handle successful submission
      console.log("Inquiry submitted successfully");
      alert("Inquiry submitted successfully"); // Show "done" popup

      // Send a confirmation email to the user
      const emailResponse = await fetch(`${Constants.API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Inquiry Received",
          text: "We have received your inquiry and we will reach out to you in 24-48 business hours.",
        }),
      });

      location.reload(); // Refresh the page
    } else {
      // Handle error
      console.log("Error submitting form");
      alert("Error submitting form"); // Show error popup
    }
  };

  // Render the ContactUsPopup component
  return (
    <div>
      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-left">
              <img src={contactGraphic} alt="Dummy" />
            </div>
            <div className="modal-right">
              <button onClick={() => setModalIsOpen(false)} className="close">
                &times;
              </button>
              <h2>Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  Message:
                  <textarea
                    name="message"
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </label>
                <input type="submit" value="Submit" className="submit-button" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsPopup;

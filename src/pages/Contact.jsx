import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { FaSearchLocation, FaMapSigns, FaEnvelopeOpenText } from "react-icons/fa";
import "../styles/contact.css";

function Contact() {
  const contactForm = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const nameValue = contactForm.current.name.value;
    const emailValue = contactForm.current.email.value;
    const messageValue = contactForm.current.message.value

    if (nameValue.trim() === "") {
      toast.error("Please write your name.");
    } else if (emailValue.trim() === "") {
      toast.error('Please write an email where we can contact.')
    } else if (messageValue.trim() === "") {
      toast.error('Please write a message.')
    } else {
      emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        contactForm.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        .then(() => {
          toast.success('Your message was successfully sent!');
          contactForm.current.reset();
        }, (error) => {
          toast.error("Something went wrong: " + error.text);
        });
    }
  }

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-address">
        <h2><FaSearchLocation /> Location: </h2>
        <p> Where you can find us </p>
        <h2> <FaMapSigns/>  Directions: </h2>
        <p> How you can reach us with transport </p>

        <h2><FaEnvelopeOpenText /> Send Us A Message: </h2>
        <form ref={contactForm} onSubmit={onSubmit}>

          <input
            className="formInput"
            placeholder="Your name"
            type="text"
            name="name"
            id="name"
          />

          <input
            className="formInput"
            placeholder="Your email"
            type="email"
            name="email"
            id="email"
          />

          <textarea
            className="formInput"
            name="message"
            id="message"
            cols="30" rows="3"
            placeholder="Your message"
          />

          <div className="page-header">
            <button className="btn" type="submit">Send</button>
          </div>
        </form>
      </div>

      <div className="contact-map">
        {/* https://developers.google.com/maps/documentation/embed/map-generator */}
        <iframe title="map" height="100%" style={{ "border": 0 }} loading="lazy" allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZ-ogNcG0NogRAznPY_tt2XM&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`}>
        </iframe>
      </div>


    </div>
  )
}

export default Contact
import React from "react";
import { HiLocationMarker, HiMail, HiLink, HiUser } from "react-icons/hi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact</h2>
      <div className="contact-details">
        <div id="name">
          <HiUser className="icon" />
          <span>Sudhanshu Sharma</span>
        </div>
        <div id="email">
          <HiMail className="icon" />
          <span>shudhanshu0511max@gmail.com</span>
        </div>
        <div id="location">
          <HiLocationMarker className="icon" />
          <span>Lucknow, Uttar Pardesh 226021</span>
        </div>
      </div>
      <div className="social-media-links">
        <Link to="https://github.com/sudo0511/react-XLS-reader" target="_blank">
          <AiFillGithub className="icon" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/sudhanshu-sharma0511?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BM2eFd4dZRwarG3hlaIcKSg%3D%3D"
          target="_blank"
        >
          <AiFillLinkedin className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Contact;

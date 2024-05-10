import React from 'react';
import '../CSS/Footer.css'; /* CSS for styling the footer */

const Footer = () => {
  return (
    <footer className="footer"> {/* Apply a class for styling */}
      <p>© Example copyright. No rights reserved.</p> {/* Example copyright */}
      <p>Contact us at Example@SomeEmail.com</p> {/* Example contact information */}
    </footer>
  );
};

export default Footer;

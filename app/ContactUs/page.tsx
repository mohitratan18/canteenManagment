import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.6', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Contact Us</h1>
      <p style={{ marginBottom: '15px' }}>
        For inquiries, complaints, or feedback, please contact us using the information below:
      </p>
      <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
        <strong>Email:</strong>{' '}
        <a
          href="mailto:support@canteenorders.com"
          style={{ color: '#007bff', textDecoration: 'underline' }}
        >
          mohitratan2003@gmail.com
        </a>
      </p>
      <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
        <strong>Phone:</strong> +91-8144436109 (Monday to Friday, 9:00 AM - 5:00 PM)
      </p>
      <p style={{ marginBottom: '15px' }}>
        Please include your order details in your message for faster assistance. We're here to help!
      </p>
    </div>
  );
};
export default ContactUs;

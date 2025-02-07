import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1
        style={{ textAlign: "center", fontSize: "2em", marginBottom: "20px" }}
      >
        Terms and Conditions
      </h1>
      <p style={{ marginBottom: "15px" }}>
        Please read these Terms and Conditions carefully before using our online
        food ordering system. By using this system, you agree to be bound by
        these terms.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        No Refund or Return Policy
      </h2>
      <p style={{ marginBottom: "15px" }}>
        Once an order is placed and payment is made, no refunds or returns will
        be allowed under any circumstances. Please ensure you review your order
        carefully before confirming your purchase.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Self-Service Model
      </h2>
      <p style={{ marginBottom: "15px" }}>
        Our service is strictly self-service. You must pay for your order online
        and collect a digital or printed token upon successful payment. This
        token must be presented at the designated counter to collect your food.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Payment Terms
      </h2>
      <p style={{ marginBottom: "15px" }}>
        All orders must be paid for online using the provided payment methods.
        Cash-on-delivery or in-person payments are not accepted.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Token Validity
      </h2>
      <p style={{ marginBottom: "15px" }}>
        Your token is valid for 30 minutes from the time of order confirmation.
        Please collect your order within this timeframe. Orders not collected
        within 30 minutes will be cancelled.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Order Accuracy
      </h2>
      <p style={{ marginBottom: "15px" }}>
        Please verify your order carefully before finalizing your payment. We
        are unable to accommodate changes or modifications once your order has
        been placed.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Food Allergy Disclaimer
      </h2>
      <p style={{ marginBottom: "15px" }}>
        We are not responsible for allergic reactions resulting from undisclosed
        food allergies or user oversight. Please review the ingredients list
        carefully before placing your order. If you have any allergies, please
        contact the canteen directly before ordering.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Prohibited Activities
      </h2>
      <p style={{ marginBottom: "15px" }}>
        Placing fake orders, misusing the platform, or engaging in any behavior
        that disrupts canteen operations is strictly prohibited. Any such
        activity may result in account suspension.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Liability Disclaimer
      </h2>
      <p style={{ marginBottom: "15px" }}>
        We are not liable for delays in service, unavailability of certain menu
        items, or errors in your order input. We strive to provide accurate
        information and timely service, but we cannot guarantee it in all cases.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        User Conduct
      </h2>
      <p style={{ marginBottom: "15px" }}>
        Please behave respectfully at the collection counter and follow all
        college canteen rules.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Modification of Terms
      </h2>
      <p style={{ marginBottom: "15px" }}>
        We reserve the right to update or modify these Terms and Conditions at
        any time. Changes will be effective immediately upon posting on the
        platform. It is your responsibility to review these terms periodically.
      </p>

      <h2
        style={{ fontSize: "1.5em", marginTop: "30px", marginBottom: "10px" }}
      >
        Governing Laws
      </h2>
      <p style={{ marginBottom: "15px" }}>
        These Terms and Conditions are governed by the laws of [State/Country].
      </p>
    </div>
  );
};

export default TermsAndConditions;

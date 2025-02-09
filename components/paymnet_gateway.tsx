"use client";

import { useEffect, useState } from "react";

interface PaymentPageProps {
  sessionId: string;
  returnUrl: string;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ sessionId, returnUrl }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Dynamically add the Cashfree script
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js"; // Update to the correct Cashfree SDK URL
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      const paymentBtn = document.getElementById("showqr");
      const paymentMessage = document.getElementById("paymentMessage");
      const cashfree = (window as any).Cashfree({ mode: "sandbox" });
      const qr = cashfree.create("upiQr", { values: { size: "220px" } });
      qr.mount("#qr");

      paymentBtn?.addEventListener("click", () => {
        paymentMessage!.innerText = "";
        paymentMessage!.classList.remove("alert-danger", "alert-success");

        cashfree
          .pay({ paymentMethod: qr, paymentSessionId: sessionId, returnUrl })
          .then((data: any) => {
            const paymentBtn = document.getElementById(
              "paymentBtn"
            ) as HTMLButtonElement; // Or however you get the reference
            paymentBtn.disabled = false;
            if (data.error) {
              paymentMessage!.innerText = data.error.message;
              paymentMessage!.classList.add("alert-danger");
            } else if (data.paymentDetails) {
              paymentMessage!.innerText = data.paymentDetails.paymentMessage;
              paymentMessage!.classList.add("alert-success");
            }
          });
      });
    }
  }, [isScriptLoaded, sessionId, returnUrl]);

  if (!isScriptLoaded) return <p>Loading...</p>; // Display loading state while script loads

  return (
    <div className="flex justify-center items-center flex-col mt-12 gap-4">
      <div className="row">
        <div className="col">
          <div className="row">
            <h1>Please scan the QR code to make payment</h1>
          </div>
        </div>
        <hr />
        <div className="col offset-1 col-10"></div>
      </div>
      <div className="row">
        <div className="col col-lg-8 col-sm-12">
          <div className="row mt-4">
            <div className="col">
              <p className="alert" id="paymentMessage"></p>
            </div>
          </div>
        </div>
        <div className="col col-lg-4 col-sm-10">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body pb-0">
              <h5 className="card-title">
                QR
                <button
                  className="btn btn-primary btn-sm float-right bg-blue-600 p-2 text-white rounded-md hover:bg-blue-500"
                  id="showqr"
                  type="button"
                >
                  Show QR
                </button>
              </h5>
              <div>
                <div id="qr" className="icon qrmount"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

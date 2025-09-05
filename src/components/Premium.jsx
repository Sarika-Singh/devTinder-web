import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.log("Error verifying premium user", err);
    }
  };
  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: plan },
      { withCredentials: true }
    );

    const { keyId, amount, currency, orderId, notes } = order.data;
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "DevTinder",
      description: "Test Transaction",
      order_id: orderId, // This is the order_id created in the backend

      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return isUserPremium ? (
    <h1 className="m-10 font-bold text-3xl">You are a Premium User</h1>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul className="list-disc list-inside">
            <li>Access to basic features</li>
            <li>Standard support</li>
            <li>Basic profile visibility</li>
            <li>Monthly newsletters</li>
          </ul>
          <button
            className="btn btn-primary mt-4"
            onClick={() => handleBuyClick("silver")}
          >
            Subscribe for $5/month
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul className="list-disc list-inside">
            <li>All Silver features</li>
            <li>Priority support</li>
            <li>Enhanced profile visibility</li>
            <li>Access to exclusive events</li>
          </ul>
          <button
            className="btn btn-secondary mt-4"
            onClick={() => handleBuyClick("gold")}
          >
            Subscribe for $15/month
          </button>
        </div>
      </div>
    </div>
  );
};
export default Premium;

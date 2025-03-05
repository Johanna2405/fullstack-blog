import { useState } from "react";

const Subscription = () => {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");

  const validateEmail = (email) => {
    // Simple email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent page reload

    if (validateEmail(email)) {
      setAlertMessage("Thank you for subscribing!");
      setAlertType("success");
    } else {
      setAlertMessage("Warning: Invalid email address!");
      setAlertType("warning");
    }

    // Auto-close alert after 3 seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <div
      className="flex flex-col container mx-auto items-center justify-center h-96 p-6 gap-6 "
      id="subscribe"
    >
      {/* Header */}
      <div className="text-center ">
        <h2 className="font-Snippet text-4xl text-lightBeige uppercase tracking-wider text-center">
          Subscribe
        </h2>
        <p className="py-4 font-extralight tracking-wider uppercase text-lightBeige">
          Get our newsletter and get inspiration for your next dream journey.
        </p>
      </div>

      {/* Email Input Field */}
      <form className="flex gap-2 w-full max-w-md" onSubmit={handleSubscribe}>
        <label className="input input-bordered border-lightBeige flex items-center w-full font-extralight tracking-wider rounded-2xl">
          <svg
            className="h-5 w-5 opacity-50 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            placeholder="mail@site.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none "
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg  text-lightBeige font-extralight uppercase tracking-widest"
        >
          Subscribe
        </button>
      </form>

      {/* Alert Message */}
      {alertMessage && (
        <div className={`alert alert-${alertType} w-full max-w-md`}>
          {alertType === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          <span>{alertMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Subscription;

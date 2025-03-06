import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { createPost } from "../utils/api";

const CreatePost = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const questions = [
    { key: "author", text: "WHAT IS YOUR NAME?", type: "text" },
    {
      key: "title",
      text: "WHAT WOULD BE THE TITLE OF YOUR BLOG?",
      type: "text",
    },
    {
      key: "content",
      text: "WRITE THE CONTENT OF YOUR BLOG.",
      type: "textarea",
    },
    { key: "cover", text: "ENTER THE COVER IMAGE URL.", type: "text" },
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleNext = () => {
    if (formData[questions[step].key].trim() === "") {
      setError("This field cannot be empty!");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [questions[step].key]: e.target.value });
    setError("");

    if (questions[step].type === "textarea") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && questions[step].type !== "textarea") {
      handleNext();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createPost(formData);
      alert("Post created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 bg-[linear-gradient(to_top,rgb(30,35,42),transparent),url('https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-top">
      <div className="bg-lightGreen p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Progress Text */}

        <p className="text-gray-600 text-sm text-center mb-4 ">
          <span className="font-Snippet text-lightBeige">
            Step {step + 1} of {questions.length}
          </span>
        </p>

        {!isSubmitting && step < questions.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 font-Snippet">
              <span className="font-Snippet text-lightBeige">
                {questions[step].text}
              </span>
            </h2>
            {questions[step].type === "textarea" ? (
              <textarea
                ref={inputRef}
                value={formData[questions[step].key]}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden`}
                rows="10"
              />
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={formData[questions[step].key]}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className={`w-full p-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                autoFocus
              />
            )}
            {error && <p>{error}</p>}
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && !isSubmitting && (
            <button
              onClick={handleBack}
              className="px-2 py-1 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg  text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
            >
              Back
            </button>
          )}
          {step < questions.length - 1 && !isSubmitting ? (
            <button
              onClick={handleNext}
              className="px-2 py-1 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg  text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
            >
              Next
            </button>
          ) : (
            !isSubmitting && (
              <button
                onClick={handleSubmit}
                className="px-2 py-1 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg  text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
              >
                Submit
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

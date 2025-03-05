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
    { key: "author", text: "What is your name?", type: "text" },
    {
      key: "title",
      text: "What would be the title of your blog?",
      type: "text",
    },
    {
      key: "content",
      text: "Write the content of your blog.",
      type: "textarea",
    },
    { key: "cover", text: "Enter the cover image URL.", type: "text" },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
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

        <p className="text-gray-600 text-sm text-center mb-4">
          Step {step + 1} of {questions.length}
        </p>

        {!isSubmitting && step < questions.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 font-snippet">
              {questions[step].text}
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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && !isSubmitting && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Back
            </button>
          )}
          {step < questions.length - 1 && !isSubmitting ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Next
            </button>
          ) : (
            !isSubmitting && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
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

import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const FeedBack = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!description) {
      toast.error("Please enter a description");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    const feedbackData = {
      title,
      description,
      category,
      user: userData.email,
    };

    try {
      const response = await fetch(
        "https://fir-32fb1-default-rtdb.firebaseio.com/feedback.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );
      if (response) {
      
        navigate("/home");
      }
      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setTitle("");
      setDescription("");
      setCategory("");
      toast.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      toast.error("Failed to submit feedback. Please try again later");
    }
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-lg-5 align-items-center w-100">
        <div className="form p-5">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <div className="mt-2">
                <h2 className="">Give Your Feedback </h2>
              </div>
            </div>
            <div className="mt-3">
              <div>
                <label>Title</label>
              </div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-100"
              />
            </div>
            <div className="mt-3">
              <div>
                <label>Category</label>
              </div>
              <select
                id="category"
                value={category}
                onChange={handleChange}
                className="w-100"
              >
                <option value="">Select a category</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="improvement">Improvement</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="mt-3">
              <div>
                <label>Description</label>
              </div>
              <textarea
                placeholder="Description"
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                className="w-100 "
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit">Submit Feedback</button>
              <Link to="/home">
                <button type="submit" style={{ background: "gray" }}>
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FeedBack;

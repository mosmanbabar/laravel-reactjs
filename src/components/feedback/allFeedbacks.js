import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const AllFeedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          "https://fir-32fb1-default-rtdb.firebaseio.com/feedback.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }

        const data = await response.json();
        if (data) {
          const feedbacksArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          navigate("/home");
          setFeedbacks(feedbacksArray);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error.message);
        toast.error("Failed to fetch feedbacks. Please try again later");
      }
    };

    fetchFeedbacks();
  }, [navigate]);

  const handleCommentInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    const currentUser = auth.currentUser;

    try {
      const selectedFeedback = feedbacks.find(
        (feedback) => feedback.id === selectedFeedbackId
      );
      const name = currentUser.displayName
        ? currentUser.displayName
        : currentUser.email
      console.log("name", name);
      const updatedComments = [
        ...(selectedFeedback.comments || []),
        { text: comment, user: name, createdAt: new Date().toISOString() },
      ];

      await fetch(
        `https://fir-32fb1-default-rtdb.firebaseio.com/feedback/${selectedFeedbackId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: updatedComments }),
        }
      );

   
      const response = await fetch(
        "https://fir-32fb1-default-rtdb.firebaseio.com/feedback.json"
      );
      const data = await response.json();
      if (data) {
        const feedbacksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFeedbacks(feedbacksArray);
      }
      toast.success("Comment added successfully");
      setComment(""); // Clear the comment input
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error adding comment:", error.message);
      toast.error("Failed to add comment. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <div>
            <h2>All Feedbacks</h2>
          </div>
          <div>
            <Link to="/feedback">
              <button>Give Feedback</button>
            </Link>
          </div>
        </div>

        <table className="table">
          <thead className="bg1">
            <tr className="bg1">
              <th scope="col" className="bg1">
                Sr#
              </th>
              <th scope="col" className="bg1">
                Title
              </th>
              <th scope="col">Category</th>
              <th scope="col">User</th>
              <th scope="col">Add Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback.id}>
                <td>{index + 1}</td>
                <td>{feedback.title}</td>
                <td>{feedback.category}</td>
                <td>{feedback.user}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedFeedbackId(feedback.id);
                      setShowModal(true);
                    }}
                  >
                    Add Comment
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton className="bg1">
            <Modal.Title className="bg1">Add Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg1">
            <Form.Group controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={
                  currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email
                }
                className="bg1"
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={new Date().toLocaleDateString()}
                className="bg1"
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                className="text-area"
                as="textarea"
                rows={3}
                value={comment}
                onChange={handleCommentInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="bg1">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitComment}>
              Add Comment
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="mt-5">
        <h2>Comments</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">User</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(
              (feedback) =>
                feedback.comments &&
                feedback.comments.map((comment, index) => (
                  <tr key={`${feedback.id}-${index}`}>
                    {index === 0 && (
                      <td rowSpan={feedback.comments.length}>
                        {feedback.title}
                      </td>
                    )}
                    <td>
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td>{comment.user}</td>
                    <td>
                      <p style={{ fontStyle: "italic", fontWeight: "bold" }}>
                        {comment.text}
                      </p>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllFeedbacks;

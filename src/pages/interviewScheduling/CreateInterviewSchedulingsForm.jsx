import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateInterviewSchedulingForm = () => {
  const navigate = useNavigate();
  const [newInterview, setNewInterview] = useState({
    candidate: "",
    interviewer: "",
    date: "",
    status: "Scheduled",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview((prevInterview) => ({
      ...prevInterview,
      [name]: value,
    }));
  };

  const handleAddInterview = (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!newInterview.candidate || !newInterview.interviewer || !newInterview.date) {
      setError("Candidate, Interviewer, and Date are required.");
      return;
    }

    // Optionally, you could also add more specific validation for formats (like date format).

    console.log("Interview created:", newInterview);

    setNewInterview({
      candidate: "",
      interviewer: "",
      date: "",
      status: "Scheduled",
    });

    setSuccess(true);
    setError(""); // Clear any previous error if the form is successfully submitted.

    setTimeout(() => {
      setSuccess(false); // Hide success message after some time
      navigate("/interview-schedulings"); // Redirect back to the interview scheduling page
    }, 1500);
  };

  const handleBack = () => {
    navigate("/interview-schedulings"); // Navigate back to the interview scheduling page
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Add New Interview</h2>

      {/* Error and Success Messages */}
      {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">Interview added successfully!</div>}

      <form onSubmit={handleAddInterview} className="space-y-6">
        {/* Candidate Field */}
        <div>
          <label htmlFor="candidate" className="text-gray-300 text-lg">Candidate</label>
          <input
            type="text"
            id="candidate"
            name="candidate"
            value={newInterview.candidate}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        {/* Interviewer Field */}
        <div>
          <label htmlFor="interviewer" className="text-gray-300 text-lg">Interviewer</label>
          <input
            type="text"
            id="interviewer"
            name="interviewer"
            value={newInterview.interviewer}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        {/* Date Field */}
        <div>
          <label htmlFor="date" className="text-gray-300 text-lg">Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={newInterview.date}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label htmlFor="status" className="text-gray-300 text-lg">Status</label>
          <select
            id="status"
            name="status"
            value={newInterview.status}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Back and Submit Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg"
          >
            Add Interview
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInterviewSchedulingForm;

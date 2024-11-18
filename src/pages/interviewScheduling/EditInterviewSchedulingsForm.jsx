import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Sample interview scheduling data
const sampleInterviewData = [
  {
    id: 1,
    candidate: "Roy Rohmat",
    interviewer: "John Doe",
    date: "2024-11-20T10:00:00",
    status: "Scheduled",
  },
  {
    id: 2,
    candidate: "Ebde Muttakin",
    interviewer: "Jane Smith",
    date: "2024-11-21T14:00:00",
    status: "Scheduled",
  },
  // More interview data
];

const EditInterviewSchedulingForm = () => {
  const { id } = useParams(); // Get the interview id from the URL parameters
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [formData, setFormData] = useState({
    candidate: "",
    interviewer: "",
    date: "",
    status: "Scheduled",
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(false); // For success message

  // Fetch the interview data (this would typically be an API call)
  useEffect(() => {
    const selectedInterview = sampleInterviewData.find(
      (interview) => interview.id === parseInt(id)
    );
    if (selectedInterview) {
      setInterview(selectedInterview);
      setFormData({
        candidate: selectedInterview.candidate,
        interviewer: selectedInterview.interviewer,
        date: selectedInterview.date,
        status: selectedInterview.status,
      });
    } else {
      navigate("/interview-schedulings");
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.candidate || !formData.interviewer || !formData.date || !formData.status) {
      setError("All fields are required.");
      return;
    }

    console.log("Updated Interview:", formData);
    setSuccess(true); // Show success message

    // Reset form after submission
    setTimeout(() => {
      navigate("/interview-schedulings"); // Navigate to interview scheduling list
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!interview) return null;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Edit Interview Scheduling</h2>

      {/* Display error message */}
      {error && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Display success message */}
      {success && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
          Interview scheduling updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-gray-300 text-lg">Candidate</label>
          <input
            type="text"
            name="candidate"
            value={formData.candidate}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Interviewer</label>
          <input
            type="text"
            name="interviewer"
            value={formData.interviewer}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Kembali
          </button>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditInterviewSchedulingForm;

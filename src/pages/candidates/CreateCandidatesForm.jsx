import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateCandidateForm = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [newCandidate, setNewCandidate] = useState({
    nama: "",
    posisi: "",
    notel: "",
    email: "",
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(false); // For success message

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  // Handle form submission
  const handleCreateCandidateForm = (e) => {
    e.preventDefault();
    // Validate input fields
    if (!newCandidate.nama || !newCandidate.email || !newCandidate.posisi || !newCandidate.notel) {
      setError("All fields are required.");
      return;
    }

    console.log("New Candidate Added:", newCandidate);
    setSuccess(true); // Show success message

    // Reset form after submission
    setNewCandidate({
      nama: "",
      posisi: "",
      notel: "",
      email: "",
    });

    setTimeout(() => {
      navigate("/candidates"); // Navigate to candidates list
    }, 1500);
  };

  // Handle closing the form (navigate back)
  const handleCloseForm = () => {
    navigate("/candidates"); // Redirect to the candidates list
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={handleCloseForm}
          className="text-gray-400 hover:text-gray-300 absolute top-2 right-2"
        >
        </button>
        <h3 className="text-3xl font-semibold text-gray-100 mb-6">Create New Candidate</h3>

        {/* Display error message */}
        {error && (
          <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Display success message */}
        {success && (
          <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
            Candidate added successfully!
          </div>
        )}

        <form onSubmit={handleCreateCandidateForm} className="space-y-6">
          <div>
            <label htmlFor="nama" className="text-gray-300 text-lg">Name</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={newCandidate.nama}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="posisi" className="text-gray-300 text-lg">Position</label>
            <input
              type="text"
              id="posisi"
              name="posisi"
              value={newCandidate.posisi}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="notel" className="text-gray-300 text-lg">Phone Number</label>
            <input
              type="text"
              id="notel"
              name="notel"
              value={newCandidate.notel}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-300 text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newCandidate.email}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            {/* Back Button */}
            <button
              type="button"
              onClick={handleCloseForm}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
            >
              Back
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all"
            >
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateCandidateForm;

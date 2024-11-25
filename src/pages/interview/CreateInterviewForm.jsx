import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateInterviewForm = () => {
  const navigate = useNavigate();
  const [newInterview, setNewInterview] = useState({
    nama: "",
    kontak: "",
    email: "",
    tanggal: "",
    posisi: "",
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(false); // For success messages

  // List of positions for the dropdown
  const POSITIONS = [
    { value: "", label: "Select a posisi..." },
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "Full Stak", label: "Full Stak" },
    { value: "Marketing Manager", label: "Marketing Manager" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
  
    
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview({ ...newInterview, [name]: value });
  };

  // Handle form submission
  const handleCreateInterviewForm = (e) => {
    e.preventDefault();
    // Validate input fields
    if (!newInterview.nama || !newInterview.kontak || !newInterview.email || !newInterview.tanggal || !newInterview.posisi) {
      setError("All fields are required.");
      return;
    }

    console.log("New Interview Added:", newInterview);
    setSuccess(true); // Show success message

    // Reset form after submission
    setNewInterview({
      nama: "",
      kontak: "",
      email: "",
      tanggal: "",
      posisi: "",
    });

    setTimeout(() => {
      navigate("/interviews"); // Navigate to interview list
    }, 1500);
  };

  // Handle closing the form (navigate back)
  const handleCloseForm = () => {
    navigate("/interviews");
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        <h3 className="text-3xl font-semibold text-gray-100 mb-6">Add Interview</h3>

        {/* Display error message */}
        {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}

        {/* Display success message */}
        {success && (
          <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
            Interview added successfully!
          </div>
        )}

        <form onSubmit={handleCreateInterviewForm} className="space-y-6">
          <div>
            <label htmlFor="nama" className="text-gray-300 text-lg">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Nama Lengkap"
              value={newInterview.nama}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="kontak" className="text-gray-300 text-lg">Kontact Person</label>
            <input
              type="text"
              id="kontak"
              name="kontak"
              placeholder="Kontak Number"
              value={newInterview.kontak}
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
              placeholder="Email"
              value={newInterview.email}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="tanggal" className="text-gray-300 text-lg">Tanggal</label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={newInterview.tanggal}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="posisi" className="text-gray-300 text-lg">Posisi</label>
            <select
              id="posisi"
              name="posisi"
              value={newInterview.posisi}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            >
              {POSITIONS.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
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
              Add Interview
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateInterviewForm;
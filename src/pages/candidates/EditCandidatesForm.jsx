import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const sampleCandidateData = [
    { id: 1, nama: "Roy Rohmat", posisi: "BackEnd", notel: "08917652341", email: "roy@gmail.com" },
    { id: 2, nama: "Ebde Muttakin", posisi: "BackEnd", notel: "08889975432", email: "dul@gmail.com" },
    { id: 3, nama: "Komeng Adul", posisi: "FrontEnd", notel: "08112467890", email: "meng@gmail.com" },
    { id: 4, nama: "Angga Yanto", posisi: "FrontEnd", notel: "08881114562", email: "gaa@gmail.com" },
    { id: 5, nama: "Dani Batubara", posisi: "Full Stack", notel: "0881023100307", email: "dan@gmail.com" },
    { id: 6, nama: "Isman Ahmad", posisi: "FrontEnd", notel: "088811145663", email: "man@gmail.com" },
    { id: 7, nama: "Alam Ilham", posisi: "BackEnd", notel: "08889975532", email: "lam@gmail.com" },
  ];

const EditCandidateForm = () => {
  const { id } = useParams(); // Get the candidate id from the URL parameters
  const navigate = useNavigate();
  
  const [candidate, setCandidate] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    notel: "",
    email: "",
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(false); // For success message

  // Fetch the candidate data (this would typically be an API call)
  useEffect(() => {
    const selectedCandidate = sampleCandidateData.find((candidate) => candidate.id === parseInt(id));
    if (selectedCandidate) {
      setCandidate(selectedCandidate);
      setFormData({
        nama: selectedCandidate.nama,
        posisi: selectedCandidate.posisi,
        notel: selectedCandidate.notel,
        email: selectedCandidate.email,
      });
    } else {
      navigate("/candidates");
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
    if (!formData.nama || !formData.email || !formData.posisi || !formData.notel) {
      setError("All fields are required.");
      return;
    }

    console.log("Updated Candidate:", formData);
    setSuccess(true); // Show success message

    // Reset form after submission
    setTimeout(() => {
      navigate("/candidates"); // Navigate to candidates list
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!candidate) return null;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Edit Candidate</h2>

      {/* Display error message */}
      {error && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Display success message */}
      {success && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
          Candidate updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-gray-300 text-lg">Name</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Position</label>
          <input
            type="text"
            name="posisi"
            value={formData.posisi}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Phone Number</label>
          <input
            type="text"
            name="notel"
            value={formData.notel}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
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

export default EditCandidateForm;

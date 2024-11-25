import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const RESULTS = [
  { value: "", label: "Select a result..." },
  { value: "Lulus", label: "Lulus" },
  { value: "Proses", label: "Proses" },
  { value: "Tidak Lulus", label: "Tidak Lulus" },
];

// Sample data
const samplePsychologicalTestData = [
  { id: 1, nama: "Roy Rohmat", hasil: "Pass", email: "roy@example.com" },
  { id: 2, nama: "Ebde Muttakin", hasil: "Fail", email: "ebde@example.com" },
  { id: 3, nama: "Komeng Adul", hasil: "Pending", email: "komeng@example.com" },
  { id: 4, nama: "Angga Yanto", hasil: "Pass", email: "angga@example.com" },
];

const EditPsychologicalTestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    hasil: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const selectedTest = samplePsychologicalTestData.find((test) => test.id === parseInt(id));
    if (selectedTest) {
      setTest(selectedTest);
      setFormData({
        nama: selectedTest.nama,
        email: selectedTest.email,
        hasil: selectedTest.hasil,
      });
    } else {
      navigate("/test");
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

    if (!formData.nama || !formData.email || !formData.hasil) {
      setError("All fields must be filled out.");
      return;
    }

    console.log("Updated Psychological Test:", formData);
    setSuccess(true);

    setTimeout(() => {
      navigate("/psychological-tests");
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!test) return null;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Edit Psychological Test</h2>

      {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}

      {success && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
          Psychological test updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-gray-300 text-lg">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            placeholder="Nama Lengkap"
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
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Hasil</label>
          <select
            name="hasil"
            value={formData.hasil}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          >
            {RESULTS.map((result) => (
              <option key={result.value} value={result.value}>
                {result.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Back
          </button>
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

export default EditPsychologicalTestForm;
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Sample data
const sampleTestSchedulingData = [
  { id: 1, nama: "Roy Rohmat", email: "roy@example.com", tanggalTes: "2024-11-25", waktuTes: "09:00", penguji: "Dr. Ana" },
  { id: 2, nama: "Ebde Muttakin", email: "ebde@example.com", tanggalTes: "2024-11-26", waktuTes: "14:00", penguji: "Dr. Budi" },
  { id: 3, nama: "Komeng Adul", email: "komeng@example.com", tanggalTes: "2024-11-27", waktuTes: "10:00", penguji: "Dr. Citra" },
  { id: 4, nama: "Angga Yanto", email: "angga@example.com", tanggalTes: "2024-11-28", waktuTes: "13:00", penguji: "Dr. Dodi" },
];

const EditTestSchedulingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    tanggalTes: "",
    waktuTes: "",
    penguji: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const selectedTest = sampleTestSchedulingData.find((test) => test.id === parseInt(id));
    if (selectedTest) {
      setTest(selectedTest);
      setFormData({
        nama: selectedTest.nama,
        email: selectedTest.email,
        tanggalTes: selectedTest.tanggalTes,
        waktuTes: selectedTest.waktuTes,
        penguji: selectedTest.penguji,
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

    if (!formData.nama || !formData.email || !formData.tanggalTes || !formData.waktuTes || !formData.penguji) {
      setError("All fields must be filled out.");
      return;
    }

    console.log("Updated Test Scheduling:", formData);
    setSuccess(true);

    setTimeout(() => {
      navigate("/test-schedulings");
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
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Edit Test Scheduling</h2>

      {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}

      {success && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
          Test scheduling updated successfully!
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
          <label className="text-gray-300 text-lg">Tanggal Tes</label>
          <input
            type="date"
            name="tanggalTes"
            value={formData.tanggalTes}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Waktu Tes</label>
          <input
            type="time"
            name="waktuTes"
            value={formData.waktuTes}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Penguji</label>
          <input
            type="text"
            name="penguji"
            value={formData.penguji}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            placeholder="Penguji"
            required
          />
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

export default EditTestSchedulingForm;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RESULTS = [
  { value: "", label: "Select a hasil" },
  { value: "Lulus", label: "Lulus" },
  { value: "Proses", label: "Proses" },
  { value: "Tidak Lulus", label: "Tidak Lulus" },
];

const CreatePsychologicalTestForm = () => {
  const navigate = useNavigate();
  const [newTest, setNewTest] = useState({
    nama: "",
    email: "",
    tanggalTes: "",
    hasil: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({ ...newTest, [name]: value });
  };

  const handleCreateTestForm = (e) => {
    e.preventDefault();

    if (!newTest.nama || !newTest.email || !newTest.tanggalTes || !newTest.hasil) {
      setError("Semua bidang harus diisi.");
      return;
    }

    console.log("New Psychological Test Added:", newTest);
    setSuccess(true);

    setNewTest({
      nama: "",
      email: "",
      tanggalTes: "",
      hasil: "",
    });

    setTimeout(() => {
      navigate("/psychological-tests");
    }, 1500);
  };

  const handleCloseForm = () => {
    navigate("/psychological-tests");
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        <h3 className="text-3xl font-semibold text-gray-100 mb-6">Add Psychological Test</h3>

        {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}

        {success && (
          <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
            Psychological test added successfully!
          </div>
        )}

        <form onSubmit={handleCreateTestForm} className="space-y-6">
          <div>
            <label htmlFor="nama" className="text-gray-300 text-lg">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={newTest.nama}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-300 text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTest.email}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label htmlFor="tanggalTes" className="text-gray-300 text-lg">Tanggal</label>
            <input
              type="date"
              id="tanggalTes"
              name="tanggalTes"
              value={newTest.tanggalTes}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              placeholder="Select test date"
              required
            />
          </div>

          <div>
            <label htmlFor="hasil" className="text-gray-300 text-lg">Hasil</label>
            <select
              id="hasil"
              name="hasil"
              value={newTest.hasil}
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
              onClick={handleCloseForm}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all"
            >
              Add Test
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePsychologicalTestForm;
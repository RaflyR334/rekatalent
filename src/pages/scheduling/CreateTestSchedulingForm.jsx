import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateTestSchedulingForm = () => {
  const navigate = useNavigate();
  const [newTest, setNewTest] = useState({
    nama: "",
    email: "",
    tanggalTes: "",
    waktuTes: "",
    penguji: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({ ...newTest, [name]: value });
  };

  const handleCreateTestScheduling = (e) => {
    e.preventDefault();

    if (!newTest.nama || !newTest.email || !newTest.tanggalTes || !newTest.waktuTes || !newTest.penguji) {
      setError("Semua bidang harus diisi.");
      return;
    }

    console.log("New Test Scheduling Added:", newTest);
    setSuccess(true);

    setNewTest({
      nama: "",
      email: "",
      tanggalTes: "",
      waktuTes: "",
      penguji: "",
    });

    setTimeout(() => {
      navigate("/test");
    }, 1500);
  };

  const handleCloseForm = () => {
    navigate("/test-schedulings");
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        <h3 className="text-3xl font-semibold text-gray-100 mb-6">Add Test Scheduling</h3>

        {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}

        {success && (
          <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
            Test scheduling added successfully!
          </div>
        )}

        <form onSubmit={handleCreateTestScheduling} className="space-y-6">
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
              required
            />
          </div>

          <div>
            <label htmlFor="waktuTes" className="text-gray-300 text-lg">Waktu</label>
            <input
              type="time"
              id="waktuTes"
              name="waktuTes"
              value={newTest.waktuTes}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="penguji" className="text-gray-300 text-lg">Penguji</label>
            <input
              type="text"
              id="penguji"
              name="penguji"
              value={newTest.penguji}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              placeholder="Penguji"
              required
            />
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

export default CreateTestSchedulingForm;
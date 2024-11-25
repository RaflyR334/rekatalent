import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// Endpoint API untuk menambah candidate
const API_URL = "https://dev.rekatalent.dev.rekadia.co.id/services/api/Candidate";

const CreateCandidateForm = () => {
  const navigate = useNavigate(); // Hook untuk navigasi programatik
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    position: "", // Pastikan posisi diset sebagai string
    email: "",
    phoneNumber: "",
  });

  const [error, setError] = useState(""); // Untuk pesan error
  const [success, setSuccess] = useState(false); // Untuk pesan sukses

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  // Handle submit form
  const handleCreateCandidateForm = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!newCandidate.name || !newCandidate.email || !newCandidate.position || !newCandidate.phoneNumber) {
      setError("Semua field harus diisi.");
      return;
    }

    // Data yang akan dikirim (gunakan JSON jika API mengharapkan format JSON)
    const candidateData = {
      name: newCandidate.name,
      position: newCandidate.position,
      email: newCandidate.email,
      phoneNumber: newCandidate.phoneNumber
    };

    try {
      // Mengirim data ke API dengan menggunakan format JSON
      const response = await axios.post(API_URL, candidateData, {
        headers: {
          "Content-Type": "application/json", // Header untuk JSON
        },
        timeout: 10000, // Menambahkan waktu timeout (dalam milidetik)
      });

      if (response.status === 200) {
        setSuccess(true); // Tampilkan pesan sukses
        setError(""); // Reset pesan error

        // Reset form setelah pengiriman
        setNewCandidate({
          name: "",
          position: "", // Reset ke string kosong
          email: "",
          phoneNumber: "",
        });

        setTimeout(() => {
          navigate("/candidates"); // Navigasi ke halaman list kandidat
        }, 1500);
      }
    } catch (err) {
      console.error("Gagal menambah kandidat:", err);

      if (err.response) {
        // Jika ada response error dari server
        console.error("Server Error: ", err.response.data);
        setError(`Error: ${err.response.data.message || 'Terjadi kesalahan saat mengirim data.'}`);
      } else if (err.request) {
        // Jika tidak ada response dari server
        console.error("Request Error: ", err.request);
        setError('Tidak ada respon dari server. Pastikan server berjalan dan periksa koneksi Anda.');
      } else {
        // Jika kesalahan terjadi di bagian lain (misalnya masalah di kode)
        console.error("Error: ", err.message);
        setError('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
      }
    }
  };

  // Handle menutup form (kembali ke halaman kandidat)
  const handleCloseForm = () => {
    navigate("/candidates"); // Redirect ke halaman list kandidat
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        {/* Tombol Tutup */}
        <button
          onClick={handleCloseForm}
          className="text-gray-400 hover:text-gray-300 absolute top-2 right-2"
        >
          {/* Tombol Tutup */}
        </button>
        <h3 className="text-3xl font-semibold text-gray-100 mb-6">Tambah Candidate Baru</h3>

        {/* Menampilkan pesan error */}
        {error && (
          <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Menampilkan pesan sukses */}
        {success && (
          <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
            Kandidat berhasil ditambahkan!
          </div>
        )}

        <form onSubmit={handleCreateCandidateForm} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-gray-300 text-lg">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCandidate.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
              placeholder="Masukkan Name"
            />
          </div>

          <div>
            <label htmlFor="position" className="text-gray-300 text-lg">Position</label>
            <input
                type="text"
                id="position"
                name="position"
                value={newCandidate.position}
                onChange={handleInputChange}
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
                required
                placeholder="Masukkan Position"
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
              placeholder="Masukkan Email"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="text-gray-300 text-lg">No.Telepon</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={newCandidate.phoneNumber}
              onChange={handleInputChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
              required
              placeholder="Masukkan No.Telepon"
            />
          </div>

          <div className="flex justify-between mt-6">
            {/* Tombol Kembali */}
            <button
              type="button"
              onClick={handleCloseForm}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
            >
              Kembali
            </button>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all"
            >
              Tambah Candidate
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateCandidateForm;

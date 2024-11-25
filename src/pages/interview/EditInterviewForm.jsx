import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const sampleInterviewData = [
  { id: 1, nama: "Roy Rohmat", posisi: "BackEnd", jadwal: "2024-11-20", email: "roy@gmail.com" },
  { id: 2, nama: "Ebde Muttakin", posisi: "BackEnd", jadwal: "2024-11-21", email: "dul@gmail.com" },
  { id: 3, nama: "Komeng Adul", posisi: "FrontEnd", jadwal: "2024-11-22", email: "meng@gmail.com" },
  { id: 4, nama: "Angga Yanto", posisi: "FrontEnd", jadwal: "2024-11-23", email: "gaa@gmail.com" },
  { id: 5, nama: "Dani Batubara", posisi: "Full Stack", jadwal: "2024-11-24", email: "dan@gmail.com" },
  { id: 6, nama: "Isman Ahmad", posisi: "FrontEnd", jadwal: "2024-11-25", email: "man@gmail.com" },
  { id: 7, nama: "Alam Ilham", posisi: "BackEnd", jadwal: "2024-11-26", email: "lam@gmail.com" },
];

const POSITIONS = [
  { value: "", label: "Select a position..." },
  { value: "BackEnd", label: "BackEnd" },
  { value: "FrontEnd", label: "FrontEnd" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "Marketing Manager", label: "Marketing Manager" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },

];

const EditInterviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    jadwal: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const selectedInterview = sampleInterviewData.find((interview) => interview.id === parseInt(id));
    if (selectedInterview) {
      setInterview(selectedInterview);
      setFormData({
        nama: selectedInterview.nama,
        posisi: selectedInterview.posisi,
        jadwal: selectedInterview.jadwal,
        email: selectedInterview.email,
      });
    } else {
      navigate("/interview");
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
    if (!formData.nama || !formData.email || !formData.posisi || !formData.jadwal) {
      setError("Semua bidang harus diisi.");
      return;
    }

    console.log("Updated Interview:", formData);
    setSuccess(true);

    setTimeout(() => {
      navigate("/interview");
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!interview) return null;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Edit Interview</h2>

      {error && <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">{error}</div>}

      {success && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
          Interview berhasil diperbarui!
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
            placeholder="Masukkan alamat email kandidat"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 text-lg">Posisi</label>
          <select
            name="posisi"
            value={formData.posisi}
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

        <div>
          <label className="text-gray-300 text-lg">Tanggal</label>
          <input
            type="date"
            name="jadwal"
            value={formData.jadwal}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            placeholder="Pilih tanggal jadwal wawancara"
            required
          />
        </div>

       
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Kembali
          </button>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>

    </motion.div>
  );
};

export default EditInterviewForm;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sampleUserData = [
  { id: 1, nama: "Roy Rohmat", email: "roy@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 2, nama: "Ebde Muttakin", email: "dul@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 3, nama: "Komeng Adul", email: "meng@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 4, nama: "Angga Yanto", email: "gaa@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 5, nama: "Dani Batubara", email: "dan@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 6, nama: "Isman Ahmad", email: "man@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 7, nama: "Alam Ilham", email: "lam@gmail.com", role: "Interviewee", status: "On Progress" },
];

const EditUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const selectedUser = sampleUserData.find((user) => user.id === parseInt(id));
    if (selectedUser) {
      setUser(selectedUser);
      setFormData({
        nama: selectedUser.nama,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      });
    } else {
      navigate("/users");
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
    alert(`User ${formData.nama} updated successfully!`);
    navigate("/users");
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!user) return null;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Edit User</h2>
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

        <div>
          <label className="text-gray-300 text-lg">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
          >
            <option value="Interviewee">Interviewee</option>
            <option value="Interviewer">Interviewer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 text-lg">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
          >
            <option value="On Progress">On Progress</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          {/* Kembali Button */}
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

export default EditUserForm;

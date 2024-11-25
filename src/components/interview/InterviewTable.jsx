import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Example interview data
const EXAMPLE_DATA = [
  { id: 1, nama: "Roy Rohmat", kontak: "08917652341", email: "roy@gmail.com", jadwal: "2024-12-01" , status: "Backend"},
  { id: 2, nama: "Ebde Muttakin", kontak: "08889975432", email: "dul@gmail.com", jadwal: "2024-12-02" , status: "Frontend"},
  { id: 3, nama: "Komeng Adul",  kontak: "08112467890", email: "meng@gmail.com", jadwal: "2024-12-03" , status: "Marketing Manager"},
  { id: 4, nama: "Angga Yanto",  kontak: "08881114562", email: "gaa@gmail.com", jadwal: "2024-12-04", status: "Full Stak" },
  { id: 5, nama: "Dani Batubara", kontak: "0881023100307", email: "dan@gmail.com", jadwal: "2024-12-05" ,  status: "UI/UX Designer" },
];

const InterviewTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterviews, setFilteredInterviews] = useState(EXAMPLE_DATA);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [deleteInterviewId, setDeleteInterviewId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigate = useNavigate();

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = EXAMPLE_DATA.filter(
      (interview) =>
        interview.nama.toLowerCase().includes(term) ||
        interview.status.toLowerCase().includes(term)
    );
    setFilteredInterviews(filtered);
  };

  // Navigate to Add Interview form
  const handleAddInterview = () => {
    navigate("/interviews/create");
  };

  // Navigate to Edit Interview form
  const handleEditInterview = (interview) => {
    navigate(`/interviews/edit/${interview.id}`);
  };

  // Show interview details in a modal
  const handleShowInterview = (interview) => {
    setSelectedInterview(interview);
  };

  // Show delete confirmation modal
  const handleDeleteClick = (interviewId) => {
    setDeleteInterviewId(interviewId);
    setIsDeleteModalVisible(true);
  };

  // Confirm deletion of an interview
  const handleConfirmDelete = () => {
    const updatedInterviews = filteredInterviews.filter(
      (interview) => interview.id !== deleteInterviewId
    );
    setFilteredInterviews(updatedInterviews);
    setIsDeleteModalVisible(false);
    setDeleteInterviewId(null);
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteInterviewId(null);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">List Interviews</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search interviews..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="mb-4">
        <Link to="/interviews/create" className="text-green-400 hover:text-green-300 flex items-center">
          <Plus size={18} />
          <span className="ml-2">Add Interview</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Kontak Person
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Posisi
              </th>
              
              
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredInterviews.map((interview) => (
              <motion.tr
                key={interview.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                  <Link to={`/interviews/edit/${interview.id}`} className="text-indigo-400 hover:text-indigo-300">
                    <Edit size={18} />
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDeleteClick(interview.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => handleShowInterview(interview)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{interview.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.kontak}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.jadwal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{interview.status}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteModalVisible && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg text-gray-100 font-semibold">Are you sure?</h3>
            <p className="text-gray-300 mt-4">Do you really want to delete this interview? This action cannot be undone.</p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg text-gray-100 font-semibold">Interview Details</h3>
            <div className="mt-4">
              <p className="text-gray-300"><strong>Nama:</strong> {selectedInterview.nama}</p>
              <p className="text-gray-300"><strong>Kontak Person:</strong> {selectedInterview.kontak}</p>
              <p className="text-gray-300"><strong>Email:</strong> {selectedInterview.email}</p>
              <p className="text-gray-300"><strong>Tanggal:</strong> {selectedInterview.jadwal}</p>
              <p className="text-gray-300"><strong>Posisi:</strong> {selectedInterview.status}</p>
             
              
            </div>
            <button
              onClick={() => setSelectedInterview(null)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InterviewTable;
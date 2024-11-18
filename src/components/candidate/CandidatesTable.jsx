import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Example candidate data
const EXAMPLE_DATA = [
  { id: 1, nama: "Roy Rohmat", posisi: "BackEnd", notel: "08917652341", email: "roy@gmail.com" },
  { id: 2, nama: "Ebde Muttakin", posisi: "BackEnd", notel: "08889975432", email: "dul@gmail.com" },
  { id: 3, nama: "Komeng Adul", posisi: "FrontEnd", notel: "08112467890", email: "meng@gmail.com" },
  { id: 4, nama: "Angga Yanto", posisi: "FrontEnd", notel: "08881114562", email: "gaa@gmail.com" },
  { id: 5, nama: "Dani Batubara", posisi: "Full Stack", notel: "0881023100307", email: "dan@gmail.com" },
  { id: 6, nama: "Isman Ahmad", posisi: "FrontEnd", notel: "088811145663", email: "man@gmail.com" },
  { id: 7, nama: "Alam Ilham", posisi: "BackEnd", notel: "08889975532", email: "lam@gmail.com" },
];

const CandidatesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState(EXAMPLE_DATA);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null); // Track candidate to be deleted
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Toggle delete confirmation modal
  const navigate = useNavigate();

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = EXAMPLE_DATA.filter(
      (candidate) =>
        candidate.nama.toLowerCase().includes(term) ||
        candidate.posisi.toLowerCase().includes(term)
    );
    setFilteredCandidates(filtered);
  };

  // Navigate to Add Candidate form
  const handleAddCandidate = () => {
    navigate("/candidates/create");
  };

  // Navigate to Edit Candidate form
  const handleEditCandidate = (candidate) => {
    navigate(`/candidates/edit/${candidate.id}`);
  };

  // Show candidate details in a modal
  const handleShowCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Show delete confirmation modal
  const handleDeleteClick = (candidateId) => {
    setDeleteCandidateId(candidateId);
    setIsDeleteModalVisible(true);
  };

  // Confirm deletion of a candidate
  const handleConfirmDelete = () => {
    const updatedCandidates = filteredCandidates.filter(
      (candidate) => candidate.id !== deleteCandidateId
    );
    setFilteredCandidates(updatedCandidates);
    setIsDeleteModalVisible(false);
    setDeleteCandidateId(null); // Reset after deletion
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteCandidateId(null); // Reset cancel
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">List Candidate</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search candidates..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Add Candidate Button */}
      <div className="mb-4">
        <Link to="/candidates/create" className="text-green-400 hover:text-green-300 flex items-center">
          <Plus size={18} />
          <span className="ml-2">Add Candidate</span>
        </Link>
      </div>

      {/* Candidate Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredCandidates.map((candidate) => (
              <motion.tr
                key={candidate.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{candidate.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.posisi}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.notel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                  <Link to={`/candidates/edit/${candidate.id}`} className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Edit size={18} />
                  </Link>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDeleteClick(candidate.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleShowCandidate(candidate)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
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
            <p className="text-gray-300 mt-4">Do you really want to delete this candidate? This action cannot be undone.</p>
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

      {/* Modal for showing candidate details */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg text-gray-100 font-semibold">Candidate Details</h3>
            <div className="mt-4">
              <p className="text-gray-300"><strong>Name:</strong> {selectedCandidate.nama}</p>
              <p className="text-gray-300"><strong>Posisi:</strong> {selectedCandidate.posisi}</p>
              <p className="text-gray-300"><strong>No.Telepon:</strong> {selectedCandidate.notel}</p>
              <p className="text-gray-300"><strong>Email:</strong> {selectedCandidate.email}</p>
            </div>
            <button
              onClick={() => setSelectedCandidate(null)}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CandidatesTable;

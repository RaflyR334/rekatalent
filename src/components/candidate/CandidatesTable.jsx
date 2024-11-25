    import { motion } from "framer-motion";
    import { Edit, Search, Trash2, Plus, Eye } from "lucide-react";
    import { useState, useEffect } from "react";
    import { Link } from "react-router-dom";
    import axios from "axios";

    // API endpoint for candidates data
    const API_URL = "https://dev.rekatalent.dev.rekadia.co.id/services/api/Candidate";

    const CandidatesTable = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [candidates, setCandidates] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      const [deleteCandidateId, setDeleteCandidateId] = useState(null);
      const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
      const [showDetailsModal, setShowDetailsModal] = useState(false);
      const [currentCandidate, setCurrentCandidate] = useState(null);

      // Fetch data from API
      const fetchCandidates = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await axios.get(API_URL);
          console.log(response);  // Log full response for debugging
          
          // Check if response status is 200 and the data is in the expected format (array)
          if (response.status === 200 && Array.isArray(response.data)) {
              // Set candidates data
              const formattedCandidates = response.data.map((candidate) => ({
                id: candidate.id,
                name: candidate.name,
                position: candidate.position, // Tambahkan nilai default jika tidak ada field `position`
                email: candidate.email,
                phoneNumber: candidate.phoneNumber,
              }));

              setCandidates(formattedCandidates);
          } else {
            setError("Data tidak valid atau tidak ditemukan dalam response.");
          }
        } catch (error) {
          // Improved error handling
          if (error.response) {
            // Server responded with a status other than 2xx
            setError(`API error: ${error.response.status} - ${error.response.data.message || "Unknown error"}`);
          } else if (error.request) {
            // No response received from the server
            setError("Tidak ada respons dari server.");
          } else {
            // Other unexpected errors
            setError("Terjadi kesalahan saat memanggil API.");
          }
          console.error("API Error:", error);
        } finally {
          setIsLoading(false); // End loading
        }
      };

      // Effect to fetch data when the component mounts
      useEffect(() => {
        fetchCandidates();
      }, []);

      // Handle search functionality
      const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
      };

      // Show delete confirmation modal
      const handleDeleteClick = (id) => {
        setDeleteCandidateId(id);
        setIsDeleteModalVisible(true);
      };

      // Confirm the deletion
      const confirmDelete = () => {
        setCandidates(candidates.filter((candidate) => candidate.id !== deleteCandidateId));
        setIsDeleteModalVisible(false);
      };

      // Cancel the deletion
      const cancelDelete = () => {
        setIsDeleteModalVisible(false);
      };

      // Open details modal
      const openDetailsModal = (candidate) => {
        setCurrentCandidate(candidate);
        setShowDetailsModal(true);
      };

      // Close details modal
      const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setCurrentCandidate(null);
      };

      // Filter candidates based on the search term
      const filteredCandidates = candidates.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(searchTerm) ||
          candidate.position?.toLowerCase().includes(searchTerm)
      );

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
                placeholder="Cari candidate..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div className="mb-4">
            <Link to="/candidates/create" className="text-green-400 hover:text-green-300 flex items-center">
              <Plus size={18} />
              <span className="ml-2">Tambah Candidate</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Aksi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Posisi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">No.Telepon</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-red-500">{error}</td>
                  </tr>
                ) : filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
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
                          onClick={() => openDetailsModal(candidate)}
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{candidate.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{candidate.phoneNumber}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Tidak ada data kandidat yang ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation Modal */}
          {isDeleteModalVisible && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-900 p-6 rounded-lg w-96 text-center">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Apakah Anda yakin ingin menghapus kandidat ini?</h3>
                <div className  ="flex justify-center gap-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
                  >
                    Tidak, Batalkan
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Candidate Details Modal */}
          {showDetailsModal && currentCandidate && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-900 p-6 rounded-lg w-96 text-left">
                <button
                  onClick={closeDetailsModal}
                  className="text-white text-xl absolute top-2 right-2"
                >
                  &times;
                </button>
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Detail Candidat</h3>
                <p className="text-gray-300"><strong>Nama:</strong> {currentCandidate.name}</p>
                <p className="text-gray-300"><strong>Posisi:</strong> {currentCandidate.position}</p>
                <p className="text-gray-300"><strong>Email:</strong> {currentCandidate.email}</p>
                <p className="text-gray-300"><strong>No. Telepon:</strong> {currentCandidate.phoneNumber}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      );
    };

    export default CandidatesTable;

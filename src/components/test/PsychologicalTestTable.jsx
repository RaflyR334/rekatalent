import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus, Eye } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Example psychological test data
const EXAMPLE_DATA = [
    { id: 1, nama: "Roy Rohmat", hasil: "Lulus", email: "roy@gmail.com", tanggal: "2024-12-01" },
    { id: 2, nama: "Ebde Muttakin", hasil: "Proses", email: "dul@gmail.com", tanggal: "2024-12-02" },
    { id: 3, nama: "Komeng Adul", hasil: "Tidak Lulus", email: "meng@gmail.com", tanggal: "2024-12-03" },
    { id: 4, nama: "Angga Yanto", hasil: "Proses", email: "gaa@gmail.com", tanggal: "2024-12-04" },
    { id: 5, nama: "Dani Batubara", hasil: "Lulus", email: "dan@gmail.com", tanggal: "2024-12-05" },
];

const PsychologicalTestTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTests, setFilteredTests] = useState(EXAMPLE_DATA);
    const [selectedTest, setSelectedTest] = useState(null);
    const [deleteTestId, setDeleteTestId] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const navigate = useNavigate();

    // Handle search functionality
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = EXAMPLE_DATA.filter(
            (test) =>
                test.nama.toLowerCase().includes(term) ||
                test.hasil.toLowerCase().includes(term)
        );
        setFilteredTests(filtered);
    };

    // Navigate to Add Test form
    const handleAddTest = () => {
        navigate("/psychological-tests/create");
    };

    // Navigate to Edit Test form
    const handleEditTest = (test) => {
        navigate(`/psychological-tests/edit/${test.id}`);
    };

    // Show test details in a modal
    const handleShowTest = (test) => {
        setSelectedTest(test);
    };

    // Show delete confirmation modal
    const handleDeleteClick = (testId) => {
        setDeleteTestId(testId);
        setIsDeleteModalVisible(true);
    };

    // Confirm deletion of a test
    const handleConfirmDelete = () => {
        const updatedTests = filteredTests.filter((test) => test.id !== deleteTestId);
        setFilteredTests(updatedTests);
        setIsDeleteModalVisible(false);
        setDeleteTestId(null);
    };

    // Cancel delete action
    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setDeleteTestId(null);
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">List Psychological Tests</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search tests..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="mb-4">
                <Link
                    to="/psychological-tests/create"
                    className="text-green-400 hover:text-green-300 flex items-center"
                >
                    <Plus size={18} />
                    <span className="ml-2">Add Test</span>
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
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tanggal
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Hasil
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredTests.map((test) => (
                            <motion.tr
                                key={test.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                                    <Link
                                        to={`/psychological-tests/edit/${test.id}`}
                                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        className="text-red-400 hover:text-red-300"
                                        onClick={() => handleDeleteClick(test.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button
                                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                                        onClick={() => handleShowTest(test)}
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{test.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{test.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{test.tanggal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{test.hasil}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
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
                        <p className="text-gray-300 mt-4">
                            Do you really want to delete this test? This action cannot be undone.
                        </p>
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

            {selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-lg text-gray-100 font-semibold">Test Details</h3>
                        <div className="mt-4">
                            <p className="text-gray-300"><strong>Nama:</strong> {selectedTest.nama}</p>
                            <p className="text-gray-300"><strong>Email:</strong> {selectedTest.email}</p>
                            <p className="text-gray-300"><strong>Tanggal:</strong> {selectedTest.tanggal}</p>
                            <p className="text-gray-300"><strong>Hasil:</strong> {selectedTest.hasil}</p>
                        </div>
                        <button
                            onClick={() => setSelectedTest(null)}
                            className="mt-6 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default PsychologicalTestTable;
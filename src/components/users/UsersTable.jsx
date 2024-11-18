import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation

// Sample user data
const userData = [
  { id: 1, nama: "Roy Rohmat", email: "roy@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 2, nama: "Ebde Muttakin", email: "dul@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 3, nama: "Komeng Adul", email: "meng@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 4, nama: "Angga Yanto", email: "gaa@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 5, nama: "Dani Batubara", email: "dan@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 6, nama: "Isman Ahmad", email: "man@gmail.com", role: "Interviewee", status: "On Progress" },
  { id: 7, nama: "Alam Ilham", email: "lam@gmail.com", role: "Interviewee", status: "On Progress" },
];

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user for the modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Show/Hide delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // Store the user to delete

  // Handle the search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = userData.filter(
      (user) => user.nama.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // Show user details in a modal
  const handleShowUser = (user) => {
    setSelectedUser(user); // Set selected user
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  // Open the delete confirmation modal
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalVisible(true);
  };

  // Confirm user deletion
  const handleConfirmDelete = () => {
    setFilteredUsers(filteredUsers.filter((user) => user.id !== userToDelete));
    setIsDeleteModalVisible(false);
    setUserToDelete(null);
    alert("User deleted successfully!");
  };

  // Cancel user deletion
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setUserToDelete(null);
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">User</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-600 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Add User Button (Navigate to /users/create) */}
      <div className="mb-4">
        <Link to="/users/create" className="text-green-400 hover:text-green-300 flex items-center">
          <Plus size={18} />
          <span className="ml-2">Add User</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.nama.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">{user.nama}</div>
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-800 text-green-100"
                        : user.status === "On Progress"
                        ? "bg-orange-800 text-orange-100"
                        : "bg-red-800 text-red-100"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Link to={`/users/edit/${user.id}`} className="text-indigo-400 hover:text-indigo-300 mr-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="text-red-400 hover:text-red-300 mr-2"
                  >
                    Delete
                  </button>
                  <button className="text-indigo-400 hover:text-indigo-300" onClick={() => handleShowUser(user)}>
                    Show
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing user details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg text-gray-100 font-semibold">User Details</h3>
            <div className="mt-4">
              <p className="text-gray-300"><strong>Name:</strong> {selectedUser.nama}</p>
              <p className="text-gray-300"><strong>Email:</strong> {selectedUser.email}</p>
              <p className="text-gray-300"><strong>Role:</strong> {selectedUser.role}</p>
              <p className="text-gray-300"><strong>Status:</strong> {selectedUser.status}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg text-white font-semibold">Are you sure?</h3>
            <p className="text-gray-300 mt-4">Do you really want to delete this user? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;

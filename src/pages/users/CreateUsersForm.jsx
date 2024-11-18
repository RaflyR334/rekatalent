import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    nama: "",
    email: "",
    role: "Interviewee",
    status: "On Progress",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!newUser.nama || !newUser.email) {
      setError("Name and Email are required.");
      return;
    }

    console.log("User created:", newUser);

    setNewUser({
      nama: "",
      email: "",
      role: "Interviewee",
      status: "On Progress",
    });

    setSuccess(true);

    setTimeout(() => {
      navigate("/users");
    }, 1500);
  };

  // Function to navigate back
  const handleBack = () => {
    navigate(-1); // Goes back to the previous page in history
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg z-20">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Create New User</h2>

      {error && (
        <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-600 text-white p-3 mb-4 rounded-lg">
          User created successfully!
        </div>
      )}

      <form onSubmit={handleAddUser} className="space-y-6">
        <div>
          <label htmlFor="nama" className="text-gray-300 text-lg">Name</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={newUser.nama}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="text-gray-300 text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="text-gray-300 text-lg">Role</label>
          <select
            id="role"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
          >
            <option value="Interviewee">Interviewee</option>
            <option value="Interviewer">Interviewer</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="text-gray-300 text-lg">Status</label>
          <select
            id="status"
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full p-3 mt-2"
          >
            <option value="On Progress">On Progress</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Back
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;

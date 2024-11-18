import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const InterviewScheduling = () => {
  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "Roy Rohmat", interviewer: "John Doe", date: "2024-11-20T10:00:00", status: "Scheduled" },
    { id: 2, candidate: "Ebde Muttakin", interviewer: "Jane Smith", date: "2024-11-21T14:00:00", status: "Scheduled" },
    { id: 3, candidate: "Komeng Adul", interviewer: "John Doe", date: "2024-11-22T10:00:00", status: "Scheduled" },
    { id: 4, candidate: "Angga Yanto", interviewer: "Jane Smith", date: "2024-11-23T14:00:00", status: "Scheduled" },
    { id: 5, candidate: "Dani Batubara", interviewer: "John Doe", date: "2024-11-24T10:00:00", status: "Scheduled" },
    { id: 6, candidate: "Isman Ahmad", interviewer: "Jane Smith", date: "2024-11-25T14:00:00", status: "Scheduled" },
    { id: 7, candidate: "Alam Ilham", interviewer: "John Doe", date: "2024-11-26T10:00:00", status: "Scheduled" },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for controlling the modal visibility
  const [interviewToDelete, setInterviewToDelete] = useState(null); // Store the interview to be deleted

  const handleDeleteInterview = (id) => {
    setInterviewToDelete(id); // Store the interview id to be deleted
    setShowDeleteModal(true); // Show the confirmation modal
  };

  const confirmDelete = () => {
    // Delete the interview by filtering it out of the interviews array
    setInterviews(interviews.filter((interview) => interview.id !== interviewToDelete));
    setShowDeleteModal(false); // Close the modal after deletion
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // Just close the modal without deleting
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Interview Scheduling</h2>
        <Link to="/interview-schedulings/create" className="text-green-400 hover:text-green-300 flex items-center">
          <Plus size={18} />
          <span className="ml-2">Add Interview Scheduling</span>
        </Link>
      </div>

      {/* Table to display interviews */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Interviewer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {interviews.map((interview) => (
              <motion.tr
                key={interview.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{interview.candidate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(interview.date).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/interview-schedulings/edit/${interview.id}`}
                      className="text-indigo-400 hover:text-indigo-300"
                      aria-label="Edit Interview"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      className="text-red-400 hover:text-red-300"
                      aria-label="Delete Interview"
                      onClick={() => handleDeleteInterview(interview.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="text-green-400 hover:text-green-300"
                      aria-label="Mark Interview as Completed"
                    >
                      <CheckCircle size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gray-900 p-6 rounded-lg w-96 text-center">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Are you sure you want to delete this interview?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InterviewScheduling;

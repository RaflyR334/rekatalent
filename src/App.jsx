import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import CandidatesPage from "./pages/candidates/CandidatesPage";
import CreateCandidateForm from "./pages/candidates/CreateCandidatesForm";
import EditCandidateForm from "./pages/candidates/EditCandidatesForm";
import UsersPage from "./pages/users/UsersPage";
import CreateUserForm from "./pages/users/CreateUsersForm";
import EditUserForm from "./pages/users/EditUsersForm";
import InterviewSchedulingPage from "./pages/interviewScheduling/InterviewSchedulingPage";
import CreateInterviewSchedulingForm from "./pages/interviewScheduling/CreateInterviewSchedulingsForm";
import EditInterviewSchedulingForm from "./pages/interviewScheduling/EditInterviewSchedulingsForm";
import OrdersPage from "./pages/OrdersPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const location = useLocation();
  
  // Check if we are on the create or edit user pages
  const isCreateUserPage = location.pathname === "/users/create";
  const isEditUserPage = location.pathname.startsWith("/users/edit");

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        {/* Apply backdrop blur only when we are NOT on create or edit user page */}
        {!(isCreateUserPage || isEditUserPage) && (
          <div className="absolute inset-0 backdrop-blur-sm z-10" />
        )}
      </div>

      <Sidebar />
      
      <div className="relative flex-1 overflow-auto z-20">  {/* Added z-20 to give content higher stacking order */}
        <Routes>
          <Route path="/" element={<OverviewPage />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserForm />} />
          <Route path="/users/edit/:id" element={<EditUserForm />} />

          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/candidates/create" element={<CreateCandidateForm />} />
          <Route path="/candidates/edit/:id" element={<EditCandidateForm />} />
          
          <Route path="/interview-schedulings" element={<InterviewSchedulingPage />} />
          <Route path="/interview-schedulings/create" element={<CreateInterviewSchedulingForm />} />
          <Route path="/interview-schedulings/edit/:id" element={<EditInterviewSchedulingForm />} />

          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

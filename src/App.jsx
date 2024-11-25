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
import PsychologicalTestsPage from "./pages/test/PsychologicalTestPage";
import CreatePsychologicalTestForm from "./pages/test/CreatePsychologicalTestForm";
import EditPsychologicalTestForm from "./pages/test/EditPsychologicalTestForm";
import InterviewsPage from "./pages/interview/InterviewPage";
import CreateInterviewForm from "./pages/interview/CreateInterviewForm";
import EditInterviewForm from "./pages/interview/EditInterviewForm";
import TestSchedulingPage from "./pages/scheduling/TestSchedulingPage";
import CreateTestSchedulingForm from "./pages/scheduling/CreateTestSchedulingForm";
import EditTestSchedulingForm from "./pages/scheduling/EditTestSchedulingForm";
import ReportPage from "./pages/report/ReportPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const location = useLocation();
  

  const isCreateUserPage = location.pathname === "/users/create";
  const isEditUserPage = location.pathname.startsWith("/users/edit");

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        {!(isCreateUserPage || isEditUserPage) && (
          <div className="absolute inset-0 backdrop-blur-sm z-10" />
        )}
      </div>

      <Sidebar />
      
      <div className="relative flex-1 overflow-auto z-20">
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

          <Route path="/test-schedulings" element={<TestSchedulingPage />} />
          <Route path="/test-schedulings/create" element={<CreateTestSchedulingForm />} />
          <Route path="/test-schedulings/edit/:id" element={<EditTestSchedulingForm />} />

          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/interviews/create" element={<CreateInterviewForm />} />
          <Route path="/interviews/edit/:id" element={<EditInterviewForm />} />

          <Route path="/psychological-tests" element={<PsychologicalTestsPage />} />
          <Route path="/psychological-tests/create" element={<CreatePsychologicalTestForm />} />
          <Route path="/psychological-tests/edit/:id" element={<EditPsychologicalTestForm />} />

          <Route path="/reports" element={<ReportPage />} />

          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

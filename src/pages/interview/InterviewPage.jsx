import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";

import { AlertTriangle, DollarSign, Calendar, TrendingUp } from "lucide-react";
import InterviewsTable from "../../components/interview/InterviewTable";

const InterviewsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Interview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        {/* <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Interviews" icon={Calendar} value={50} color="#6366F1" />
          <StatCard name="Completed Interviews" icon={TrendingUp} value={40} color="#10B981" />
          <StatCard name="Pending Interviews" icon={AlertTriangle} value={10} color="#F59E0B" />
          <StatCard name="Total Offers" icon={DollarSign} value={"$1,000,000"} color="#EF4444" />
        </motion.div> */}

        <InterviewsTable />
      </main>
    </div>
  );
};

export default InterviewsPage;
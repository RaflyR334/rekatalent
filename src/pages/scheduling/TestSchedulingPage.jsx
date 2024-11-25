import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import TestSchedulingTable from "../../components/scheduling/TestSchedulingTable"; // Update the import path as needed

const TestSchedulingPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Psycho Test Scheduling" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Uncomment and adjust stats if needed */}
        {/* <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Tests" icon={Package} value={1234} color="#6366F1" />
          <StatCard name="Upcoming Tests" icon={TrendingUp} value={89} color="#10B981" />
          <StatCard name="Scheduled Tests" icon={AlertTriangle} value={23} color="#F59E0B" />
          <StatCard name="Average Duration" icon={Clock} value="1 hour" color="#EF4444" />
        </motion.div> */}

        <TestSchedulingTable />
      </main>
    </div>
  );
};

export default TestSchedulingPage;
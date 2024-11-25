import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import PsychologicalTestTable from "../../components/test/PsychologicalTestTable"; // Update the import path as needed

const PsychologicalTestPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Psychological Test' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* Uncomment and adjust stats if needed */}
				{/* <motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Tests' icon={Package} value={1234} color='#6366F1' />
					<StatCard name='Top Score' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard name='Pending Results' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard name='Average Score' icon={DollarSign} value={"85%"} color='#EF4444' />
				</motion.div> */}

				<PsychologicalTestTable />
			</main>
		</div>
	);
};

export default PsychologicalTestPage;
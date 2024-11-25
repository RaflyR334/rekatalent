import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import InterviewScheduling from "../../components/interviewScheduling/InterviewScheduling";

const InterviewSchedulingPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Interview Scheduling' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<InterviewScheduling />
			</main>
		</div>
	);
};
export default InterviewSchedulingPage;

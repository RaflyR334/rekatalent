import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CandidatesTable from "../../components/candidate/CandidatesTable";

const CandidatesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Candidate' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<CandidatesTable />
			</main>
		</div>
	);
};
export default CandidatesPage;

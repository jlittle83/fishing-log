import StatsSummary from '../components/dashboard/StatsSummary'
import CatchesOverTime from '../components/dashboard/CatchesOverTime'
import SpeciesChart from '../components/dashboard/SpeciesChart'

const Dashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Your fishing stats at a glance</p>
      </div>
      <StatsSummary />
      <CatchesOverTime />
      <SpeciesChart />
    </div>
  )
}

export default Dashboard
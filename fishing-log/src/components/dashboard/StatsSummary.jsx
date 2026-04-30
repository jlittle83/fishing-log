import useCatchStore from '../../store/useCatchStore'
import useAuthStore from '../../store/useAuthStore'
import {
  getTotalCatches,
  getHeaviestCatch,
  getMostCaughtSpecies,
  getCatchesThisMonth,
} from '../../utils/statsHelpers'
import { formatWeight } from '../../utils/formatters'

const StatCard = ({ label, value, sub, emoji }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{emoji}</span>
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
)

const StatsSummary = () => {
  const { catches } = useCatchStore()
  const { user } = useAuthStore()

  const userCatches = catches.filter((c) => c.userId === user?.uid)

  const total = getTotalCatches(userCatches)
  const heaviest = getHeaviestCatch(userCatches)
  const topSpecies = getMostCaughtSpecies(userCatches)
  const thisMonth = getCatchesThisMonth(userCatches)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        emoji="🎣"
        label="Total Catches"
        value={total}
      />
      <StatCard
        emoji="⚖️"
        label="Heaviest Catch"
        value={heaviest ? formatWeight(heaviest.weight, heaviest.weightUnit) : '—'}
        sub={heaviest ? heaviest.species : null}
      />
      <StatCard
        emoji="🏆"
        label="Top Species"
        value={topSpecies || '—'}
      />
      <StatCard
        emoji="📅"
        label="This Month"
        value={thisMonth}
        sub="catches"
      />
    </div>
  )
}

export default StatsSummary
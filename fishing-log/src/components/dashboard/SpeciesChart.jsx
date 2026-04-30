import useCatchStore from '../../store/useCatchStore'
import useAuthStore from '../../store/useAuthStore'
import { getCatchesBySpecies } from '../../utils/statsHelpers'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const COLORS = [
  '#1d4ed8', '#0369a1', '#0891b2', '#0d9488',
  '#059669', '#65a30d', '#ca8a04', '#ea580c',
]

const SpeciesChart = () => {
  const { catches } = useCatchStore()
  const { user } = useAuthStore()

  const userCatches = catches.filter((c) => c.userId === user?.uid)
  const data = getCatchesBySpecies(userCatches)

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Species Breakdown</h2>
        <div className="flex items-center justify-center h-40 text-gray-300 text-sm">
          No data yet
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Species Breakdown</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="species"
            tick={{ fontSize: 12 }}
            width={120}
          />
          <Tooltip />
          <Bar dataKey="count" name="Catches" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpeciesChart
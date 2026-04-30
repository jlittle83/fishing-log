import useCatchStore from '../../store/useCatchStore'
import useAuthStore from '../../store/useAuthStore'
import { getCatchesOverTime } from '../../utils/statsHelpers'
import { formatMonth } from '../../utils/formatters'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const CatchesOverTime = () => {
  const { catches } = useCatchStore()
  const { user } = useAuthStore()

  const userCatches = catches.filter((c) => c.userId === user?.uid)
  const data = getCatchesOverTime(userCatches).map((d) => ({
    ...d,
    label: formatMonth(d.month),
  }))

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Catches Over Time</h2>
        <div className="flex items-center justify-center h-40 text-gray-300 text-sm">
          No data yet
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Catches Over Time</h2>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="catchGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#1d4ed8"
            strokeWidth={2}
            fill="url(#catchGradient)"
            name="Catches"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CatchesOverTime
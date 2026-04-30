import useCatchStore from '../../store/useCatchStore'
import useAuthStore from '../../store/useAuthStore'
import { getPersonalBests } from '../../utils/statsHelpers'
import { formatWeight, formatDate } from '../../utils/formatters'

const PersonalBests = () => {
  const { catches } = useCatchStore()
  const { user } = useAuthStore()

  const userCatches = catches.filter((c) => c.userId === user?.uid)
  const bests = getPersonalBests(userCatches)

  if (!bests.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">🏆</div>
        <p className="text-lg font-medium">No personal bests yet</p>
        <p className="text-sm mt-1">Log some catches to see your records here</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Personal Bests</h1>
        <p className="text-gray-500 text-sm mt-1">
          Your heaviest catch per species
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bests.map((c, index) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎣'}
              </span>
              <span className="text-xs text-gray-400">{formatDate(c.date)}</span>
            </div>
            <p className="font-bold text-gray-800 text-lg">{c.species}</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {formatWeight(c.weight, c.weightUnit)}
            </p>
            <div className="mt-3 pt-3 border-t border-gray-50 space-y-1">
              {c.location && (
                <p className="text-xs text-gray-400">📍 {c.location}</p>
              )}
              {c.bait && (
                <p className="text-xs text-gray-400">🪱 {c.bait}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalBests
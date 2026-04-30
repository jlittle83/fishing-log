import { useState } from 'react'
import useCatchStore from '../../store/useCatchStore'
import useAuthStore from '../../store/useAuthStore'
import { formatWeight, formatDate } from '../../utils/formatters'
import CatchForm from './CatchForm'

const CatchList = () => {
  const { catches, deleteCatch } = useCatchStore()
  const { user } = useAuthStore()
  const [showForm, setShowForm] = useState(false)
  const [editCatch, setEditCatch] = useState(null)
  const [filterSpecies, setFilterSpecies] = useState('')
  const [filterStart, setFilterStart] = useState('')
  const [filterEnd, setFilterEnd] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const userCatches = catches.filter((c) => c.userId === user?.uid)
  const species = [...new Set(userCatches.map((c) => c.species))].sort()

  const filtered = userCatches
    .filter((c) => {
      if (filterSpecies && c.species !== filterSpecies) return false
      if (filterStart && c.date < filterStart) return false
      if (filterEnd && c.date > filterEnd) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') return b.date.localeCompare(a.date)
      if (sortBy === 'weight') return b.weight - a.weight
      if (sortBy === 'species') return a.species.localeCompare(b.species)
      return 0
    })

  const handleEdit = (c) => {
    setEditCatch(c)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    deleteCatch(id)
    setConfirmDelete(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Catch Log</h1>
        <button
          onClick={() => { setEditCatch(null); setShowForm(true) }}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          + Add Catch
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Species</option>
            {species.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="date"
            value={filterStart}
            onChange={(e) => setFilterStart(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={filterEnd}
            onChange={(e) => setFilterEnd(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort: Date</option>
            <option value="weight">Sort: Weight</option>
            <option value="species">Sort: Species</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🎣</div>
          <p className="text-lg font-medium">No catches yet</p>
          <p className="text-sm mt-1">Hit "+ Add Catch" to log your first one</p>
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Species</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Weight</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Bait</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Location</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Weather</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{c.species}</td>
                    <td className="px-4 py-3 text-gray-600">{formatWeight(c.weight, c.weightUnit)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(c.date)}</td>
                    <td className="px-4 py-3 text-gray-600">{c.bait || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.location || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.weather || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(c)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDelete(c.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Catch?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <CatchForm
          onClose={() => { setShowForm(false); setEditCatch(null) }}
          editCatch={editCatch}
          userId={user?.uid}
        />
      )}
    </div>
  )
}

export default CatchList
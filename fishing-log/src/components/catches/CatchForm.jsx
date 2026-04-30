import { useState, useEffect } from 'react'
import useCatchStore from '../../store/useCatchStore'

const SPECIES_SUGGESTIONS = [
  'Largemouth Bass', 'Smallmouth Bass', 'Striped Bass',
  'Rainbow Trout', 'Brown Trout', 'Brook Trout',
  'Walleye', 'Pike', 'Muskie', 'Catfish', 'Crappie',
  'Bluegill', 'Redfish', 'Snook', 'Flounder', 'Carp'
]

const WEATHER_OPTIONS = [
  'Sunny', 'Partly Cloudy', 'Overcast', 'Rainy', 'Windy', 'Foggy'
]

const defaultForm = {
  species: '',
  weight: '',
  weightUnit: 'lbs',
  date: new Date().toISOString().slice(0, 10),
  bait: '',
  location: '',
  weather: '',
  notes: '',
}

const CatchForm = ({ onClose, editCatch = null, userId }) => {
  const { addCatch, updateCatch } = useCatchStore()
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editCatch) setForm(editCatch)
  }, [editCatch])

  const validate = () => {
    const e = {}
    if (!form.species.trim()) e.species = 'Species is required'
    if (!form.weight || isNaN(form.weight) || form.weight <= 0)
      e.weight = 'Valid weight is required'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    if (editCatch) {
      updateCatch(editCatch.id, { ...form, weight: parseFloat(form.weight) })
    } else {
      addCatch({ ...form, weight: parseFloat(form.weight) }, userId)
    }
    onClose()
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {editCatch ? 'Edit Catch' : 'Log a Catch'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Species */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Species <span className="text-red-500">*</span>
              </label>
              <input
                list="species-list"
                value={form.species}
                onChange={(e) => handleChange('species', e.target.value)}
                placeholder="e.g. Largemouth Bass"
                maxLength={50}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.species ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              <datalist id="species-list">
                {SPECIES_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
              {errors.species && (
                <p className="text-red-500 text-xs mt-1">{errors.species}</p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.weight ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                <select
                  value={form.weightUnit}
                  onChange={(e) => handleChange('weightUnit', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
              {errors.weight && (
                <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.date ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            {/* Bait */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bait / Lure
              </label>
              <input
                type="text"
                value={form.bait}
                onChange={(e) => handleChange('bait', e.target.value)}
                placeholder="e.g. Plastic worm"
                maxLength={50}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g. Lake Norman"
                maxLength={100}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Weather */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weather
              </label>
              <select
                value={form.weather}
                onChange={(e) => handleChange('weather', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select weather...</option>
                {WEATHER_OPTIONS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Any additional details..."
                maxLength={300}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-700 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              {editCatch ? 'Save Changes' : 'Log Catch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatchForm
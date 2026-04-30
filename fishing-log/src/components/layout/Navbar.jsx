import { NavLink } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

const Navbar = () => {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎣</span>
          <span className="font-bold text-lg tracking-tight">FishLog</span>
        </div>

        <div className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'font-semibold border-b-2 border-white pb-0.5'
                : 'opacity-75 hover:opacity-100 transition-opacity'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/log"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold border-b-2 border-white pb-0.5'
                : 'opacity-75 hover:opacity-100 transition-opacity'
            }
          >
            Catch Log
          </NavLink>
          <NavLink
            to="/bests"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold border-b-2 border-white pb-0.5'
                : 'opacity-75 hover:opacity-100 transition-opacity'
            }
          >
            Personal Bests
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs opacity-75 hidden sm:block">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors px-3 py-1.5 rounded-lg font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
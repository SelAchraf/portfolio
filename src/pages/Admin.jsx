import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Helmet } from 'react-helmet-async'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [guestbookEntries, setGuestbookEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(null)

  // Hardcoded PIN - You can also use env variable: import.meta.env.VITE_ADMIN_PIN
  const ADMIN_PIN = '1234'

  useEffect(() => {
    if (isAuthenticated) {
      fetchGuestbookEntries()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PIN) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect PIN')
      setPassword('')
    }
  }

  const fetchGuestbookEntries = async () => {
    setLoading(true)
    try {
      if (!supabase) {
        setError('Supabase is not configured. Please set up your credentials in .env file.')
        setGuestbookEntries([])
        return
      }
      
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGuestbookEntries(data || [])
    } catch (err) {
      console.error('Error fetching guestbook entries:', err)
      setError('Failed to load entries. Make sure Supabase is configured.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    if (!supabase) {
      alert('Supabase is not configured. Cannot delete entries.')
      return
    }

    setDeleteLoading(id)
    try {
      const { error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Update local state to remove the deleted entry
      setGuestbookEntries(prev => prev.filter(entry => entry.id !== id))
    } catch (err) {
      console.error('Error deleting entry:', err)
      alert('Failed to delete entry')
    } finally {
      setDeleteLoading(null)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center px-4">
        <Helmet>
          <title>Admin - Portfolio</title>
        </Helmet>
        
        <div className="w-full max-w-md">
          <div className="bg-card-bg border border-text-secondary/10 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-2" style={{ color: '#c026d3' }}>
              Admin Access
            </h1>
            <p className="text-text-muted text-center mb-8">
              Enter PIN to access dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-text-secondary mb-2 font-medium">
                  PIN
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-deep-black border border-text-secondary/20 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-[#c026d3] focus:border-transparent"
                  placeholder="Enter admin PIN"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#c026d3' }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black px-4 py-8">
      <Helmet>
        <title>Guestbook Admin - Portfolio</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#c026d3' }}>
                Guestbook Admin
              </h1>
              <p className="text-text-muted">
                Manage and moderate guestbook entries
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-card-bg hover:bg-card-bg-hover border border-text-secondary/20 rounded-lg text-text-secondary transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 bg-card-bg border border-text-secondary/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm mb-1">Total Entries</p>
              <p className="text-3xl font-bold text-text-primary">{guestbookEntries.length}</p>
            </div>
            <button
              onClick={fetchGuestbookEntries}
              disabled={loading}
              className="px-4 py-2 bg-card-bg-hover hover:bg-soft-charcoal border border-text-secondary/20 rounded-lg text-text-secondary transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-text-secondary/20 border-t-[#c026d3]"></div>
            <p className="text-text-muted mt-4">Loading entries...</p>
          </div>
        ) : guestbookEntries.length === 0 ? (
          <div className="text-center py-12 bg-card-bg border border-text-secondary/10 rounded-xl">
            <p className="text-text-muted">No guestbook entries yet</p>
          </div>
        ) : (
          <div className="bg-card-bg border border-text-secondary/10 rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-text-secondary/10">
                    <th className="text-left py-4 px-6 font-semibold" style={{ color: '#c026d3' }}>
                      Name
                    </th>
                    <th className="text-left py-4 px-6 font-semibold" style={{ color: '#c026d3' }}>
                      Message
                    </th>
                    <th className="text-left py-4 px-6 font-semibold" style={{ color: '#c026d3' }}>
                      Date
                    </th>
                    <th className="text-center py-4 px-6 font-semibold" style={{ color: '#c026d3' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guestbookEntries.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-text-secondary/10 hover:bg-card-bg-hover transition-colors ${
                        index === guestbookEntries.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-6 text-text-primary font-medium">
                        {entry.name}
                      </td>
                      <td className="py-4 px-6 text-text-secondary max-w-md">
                        <p className="line-clamp-2">{entry.message}</p>
                      </td>
                      <td className="py-4 px-6 text-text-muted text-sm">
                        {formatDate(entry.created_at)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          disabled={deleteLoading === entry.id}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleteLoading === entry.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-text-secondary/10">
              {guestbookEntries.map((entry) => (
                <div key={entry.id} className="p-4 hover:bg-card-bg-hover transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text-primary">{entry.name}</h3>
                    <span className="text-xs text-text-muted">{formatDate(entry.created_at)}</span>
                  </div>
                  <p className="text-text-secondary text-sm mb-3">{entry.message}</p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deleteLoading === entry.id}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {deleteLoading === entry.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

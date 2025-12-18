import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data from Sanity
 * @param {Function} fetchFunction - The Sanity fetch function to execute
 * @param {Array} dependencies - Dependencies array for re-fetching
 * @returns {Object} { data, loading, error, refetch }
 */
export const useSanityData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err.message || 'Failed to fetch data')
      console.error('Sanity fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}

/**
 * Hook for fetching multiple Sanity data sources in parallel
 * @param {Array} fetchFunctions - Array of fetch functions
 * @returns {Object} { data, loading, error, refetch }
 */
export const useSanityMultiData = (fetchFunctions) => {
  const [data, setData] = useState(fetchFunctions.map(() => null))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAllData = async () => {
    try {
      setLoading(true)
      setError(null)
      const results = await Promise.all(fetchFunctions.map(fn => fn()))
      setData(results)
    } catch (err) {
      setError(err.message || 'Failed to fetch data')
      console.error('Sanity multi-fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  return { data, loading, error, refetch: fetchAllData }
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface InterventionRecord {
  id: string
  user_id: string
  checkin_id: string
  template_type: 'compassion' | 'reflection' | 'action'
  message_payload: {
    title: string
    body: string
    cta_text: string
  }
  fallback: boolean
  viewed: boolean
  created_at: string
}

export function useInterventions() {
  const [interventions, setInterventions] = useState<InterventionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Debug state changes
  useEffect(() => {
    console.log('🔄 Interventions state changed:', interventions.length, interventions)
  }, [interventions])

  const supabase = createClient()

  const fetchInterventions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Please log in to view your messages')
        return
      }

      // Fetch the most recent intervention that has an associated check-in
      const { data, error: fetchError } = await supabase
        .from('interventions')
        .select('*')
        .eq('user_id', user.id)
        .not('checkin_id', 'is', null) // Only interventions with check-in data
        .order('created_at', { ascending: false })
        .limit(1) // Show only the most recent intervention

      if (fetchError) {
        console.error('Error fetching interventions:', fetchError)
        setError('Failed to load coaching message')
        return
      }

      console.log('🔍 Interventions fetched:', data)
      console.log('🔍 About to call setInterventions with:', data || [])
      
      // If no data with inner join, try a simpler query
      if (!data || data.length === 0) {
        console.log('🔍 No interventions found, trying simpler query...')
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('interventions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
        
        if (fallbackError) {
          console.error('Fallback query error:', fallbackError)
        } else {
          console.log('🔍 Fallback interventions:', fallbackData)
          console.log('🔍 About to call setInterventions with fallback:', fallbackData || [])
          setInterventions(fallbackData || [])
          return
        }
      }
      
      setInterventions(data || [])
      console.log('🔍 setInterventions called with:', data || [])
    } catch (err) {
      console.error('Error fetching interventions:', err)
      setError('Failed to load coaching message')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const refreshInterventions = useCallback(() => {
    console.log('🔄 refreshInterventions called, fetching...')
    fetchInterventions()
  }, [fetchInterventions])

  useEffect(() => {
    fetchInterventions()
  }, [fetchInterventions])

  return {
    interventions,
    loading,
    error,
    refreshInterventions
  }
}
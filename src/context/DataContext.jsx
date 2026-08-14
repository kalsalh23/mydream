import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, SETTINGS_ROW } from '../lib/supabase'
import {
  DEFAULT_SETTINGS,
  DEFAULT_TEAM,
  DEFAULT_SUPERVISORS,
  DEFAULT_COMPONENTS,
  DEFAULT_FEATURES,
  DEFAULT_STAGES,
} from '../data/defaults'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [team, setTeam] = useState(DEFAULT_TEAM)
  const [supervisors, setSupervisors] = useState(DEFAULT_SUPERVISORS)
  const [components, setComponents] = useState(DEFAULT_COMPONENTS)
  const [features, setFeatures] = useState(DEFAULT_FEATURES)
  const [stages, setStages] = useState(DEFAULT_STAGES)
  const [media, setMedia] = useState([])
  const [documents, setDocuments] = useState([])
  const [loaded, setLoaded] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [s, t, sup, c, f, st, m, d] = await Promise.all([
        supabase.from('project_settings').select('*').eq('id', SETTINGS_ROW).maybeSingle(),
        supabase.from('team_members').select('*').order('sort_order'),
        supabase.from('supervisors').select('*').order('sort_order'),
        supabase.from('components').select('*').order('sort_order'),
        supabase.from('features').select('*').order('sort_order'),
        supabase.from('stages').select('*').order('sort_order'),
        supabase.from('media').select('*').order('sort_order'),
        supabase.from('documents').select('*').order('sort_order'),
      ])
      if (s.data) setSettings({ ...DEFAULT_SETTINGS, ...s.data })
      if (t.data?.length) setTeam(t.data)
      if (sup.data?.length) setSupervisors(sup.data)
      if (c.data?.length) setComponents(c.data)
      if (f.data?.length) setFeatures(f.data)
      if (st.data?.length) setStages(st.data)
      if (m.data) setMedia(m.data)
      if (d.data) setDocuments(d.data)
    } catch (e) {
      console.warn('Failed to load data, using defaults', e)
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const reload = () => {
    setLoaded(false)
    loadData()
  }

  return (
    <DataContext.Provider
      value={{
        settings,
        team,
        supervisors,
        components,
        features,
        stages,
        media,
        documents,
        loaded,
        reload,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
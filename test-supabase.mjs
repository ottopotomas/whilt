import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

console.log('🔍 Script started')

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('❌ Missing env variables')
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

console.log('✅ Supabase client created')

// Insert sample projects
async function insertSampleProjects() {
  console.log('🧪 Checking if insert is needed...')

  const { data: existing, error: checkError } = await supabase.from('projects').select('*')

  if (checkError) {
    console.error('❌ Failed to check existing projects:', checkError.message)
    return
  }

  if (existing.length > 0) {
    console.log('ℹ️ Projects already exist, skipping insert')
    return
  }

  console.log('🚀 No existing projects, inserting now...')

  const { error: insertError } = await supabase.from('projects').insert([
    { name: 'WHILT Alpha' },
    { name: 'Landing Page Redo' },
    { name: 'Portfolio 2025' }
  ])

  if (insertError) {
    console.error('❌ Insert failed:', insertError.message)
  } else {
    console.log('✅ Inserted sample projects')
  }
}

// Fetch projects
async function fetchProjects() {
  const { data, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error('❌ Failed to fetch projects:', error.message)
  } else {
    console.log('✅ Retrieved projects:', data)
  }
}

// Run both
insertSampleProjects().then(fetchProjects)

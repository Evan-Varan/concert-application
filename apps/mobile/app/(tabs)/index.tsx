import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export default function HomeScreen() {
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch(`${API_URL}/health/db`)
        const data = await res.json()
        setStatus(data.ok ? 'Database connected' : 'Database disconnected')
      } catch {
        setStatus('API request failed')
      }
    }

    checkDb()
  }, [])

  return (
    <View style={{ padding: 24 }}>
      <Text>{status}</Text>
    </View>
  )
}
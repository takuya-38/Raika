'use client'
import { useAuth } from '@/context/auth'
import { login, logout } from '@/lib/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const user = useAuth()
  const [waiting, setWaiting] = useState(false)
  const router = useRouter()

  const signIn = async () => {
    setWaiting(true)

    try {
      await login()
      if (user) {
        router.push('/reservations')
      }
    } catch (error) {
      console.error(error?.code)
    } finally {
      setWaiting(false)
    }
  }

  console.log(user)

  return (
    <div>
      {user === null && !waiting && <button onClick={signIn}>ログイン</button>}
      {user && <button onClick={logout}>ログアウト</button>}
    </div>
  )
}

'use client'
import { useAuth } from '@/context/auth'
import { login, logout } from '@/lib/auth'
import { useState } from 'react'

export default function Home() {
  const user = useAuth()
  const [waiting, setWaiting] = useState(false)

  const signIn = () => {
    setWaiting(true)

    login()
      .catch((error) => {
        console.error(error?.code)
        console.log('era- ')
      })
      .finally(() => {
        setWaiting(false)
      })
  }

  console.log(user)

  return (
    <div>
      {user === null && !waiting && <button onClick={signIn}>ログイン</button>}
      {user && <button onClick={logout}>ログアウト</button>}
    </div>
  )
}

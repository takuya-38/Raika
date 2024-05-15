'use client'
// import { useAuth } from '@/context/auth'
// import { login, logout } from '@/lib/auth'
// import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/lib/FirebaseConfig'
import { useSnackbarContext } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'

export default function Home() {
  const router = useRouter()
  const { showSnackbar } = useSnackbarContext()

  const googleProvider = new GoogleAuthProvider()
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        if (auth.currentUser.email !== process.env.NEXT_PUBLIC_APPLY_MAIL) {
          auth.currentUser.delete()
          if (showSnackbar) {
            showSnackbar('error', '使用不可なアカウントです。')
          }
        } else {
          console.log(auth.currentUser.email)
          router.push('/reservations')
        }
      })
      .catch((err) => console.error(err))
  }

  const handleTest = () => {
    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        return fetch('http://localhost:3001/menus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + idToken,
          },
        })
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error('Error fetching events:', err))
  }

  return (
    <>
      <p>Sign in with Google:</p>
      <button onClick={handleGoogleSignIn}>Google</button>
      <button onClick={handleTest}>test</button>
    </>
  )
}

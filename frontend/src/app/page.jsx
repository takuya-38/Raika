'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import { auth } from '@/lib/FirebaseConfig'
import { useSnackbarContext } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'

export default function Home() {
  const router = useRouter()
  const { showSnackbar } = useSnackbarContext()

  // const googleProvider = new GoogleAuthProvider()
  // const handleGoogleSignIn = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then(() => {
  //       if (auth.currentUser.email !== process.env.NEXT_PUBLIC_APPLY_MAIL) {
  //         auth.currentUser.delete()
  //         if (showSnackbar) {
  //           showSnackbar('error', '使用不可なアカウントです。')
  //         }
  //       } else {
  //         console.log(auth.currentUser.email)
  //         router.push('/reservations')
  //       }
  //     })
  //     .catch((err) => console.error(err))
  // }

  // const handleTest = () => {
  //   auth.currentUser
  //     .getIdToken(true)
  //     .then((idToken) => {
  //       return fetch('http://localhost:3001/menus', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + idToken,
  //         },
  //       })
  //     })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error('Error fetching events:', err))
  // }

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    const uiConfig = {
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          const user = authResult.user
          if (user.email !== process.env.NEXT_PUBLIC_APPLY_MAIL) {
            user.delete().then(() => {
              if (showSnackbar) {
                showSnackbar('error', '使用不可なアカウントです。')
              }
            })
          } else {
            console.log(user.email)
            router.push('/reservations')
          }
          return false
        },
      },
      signInFlow: 'popup',
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  }, [showSnackbar])

  return (
    <div>
      <h1>Welcome to My App</h1>
      <div className="googleLogo" id="firebaseui-auth-container"></div>
    </div>
  )
}

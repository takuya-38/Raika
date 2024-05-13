'use client'
import { useSnackbarContext } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'
import { auth, db } from '@/lib/FirebaseConfig'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()
const allowedEmails = ['takuya.kogoma.38@gmail.com']

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const { showSnackbar } = useSnackbarContext()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        //// 許可されていないメールアドレスの場合、ユーザーを削除
        if (!allowedEmails.includes(firebaseUser.email)) {
          await firebaseUser.delete()
          setUser(null)

          if (showSnackbar) {
            showSnackbar('error', '使用不可なアカウントです。')
          }

          return
        }

        const ref = doc(db, `users/${firebaseUser.uid}`)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          const appUser = (await getDoc(ref)).data()
          setUser(appUser)
        } else {
          const appUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
          }

          setDoc(ref, appUser).then(() => {
            setUser(appUser)
          })
        }
      } else {
        setUser(null)
      }

      return unsubscribe
    })
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { GoogleAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import logoImage from '@/public/logo/Raika_logo.png'
import pictureImage from '@/public/picture/login_page_picture.jpg'
import { auth } from '@/lib/FirebaseConfig'
import { useSnackbarContext } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'
import styles from './style.module.css'

export default function Home() {
  const router = useRouter()
  const { showSnackbar } = useSnackbarContext()

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, [showSnackbar])

  return (
    <div className={styles.container}>
      <div className={styles.loginPage}>
        <div className={styles.pictureWrapper}>
          <Image
            src={pictureImage}
            alt="picture"
            layout="fill"
            className={styles.pictureImage}
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.loginWrapper}>
          <div className={styles.imageBox}>
            <Image src={logoImage} alt="logo" width="auto" height={90} />
          </div>
          <div
            className={styles.googleLogo}
            id="firebaseui-auth-container"
          ></div>
        </div>
      </div>
    </div>
  )
}

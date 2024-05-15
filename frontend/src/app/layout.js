import { Inter } from 'next/font/google'
import './globals.css'
import { SnackbarProvider } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'
import RecoilProvider from '@/app/components/provider/recoilProvider.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Raika',
  description: 'Raika',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SnackbarProvider>
          <RecoilProvider>
            <div className="body">{children}</div>
          </RecoilProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}

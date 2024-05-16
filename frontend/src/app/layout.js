import { Inter } from 'next/font/google'
import { TabProvider } from '@/app/components/provider/tabProvider'
import { SnackbarProvider } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'
import RecoilProvider from '@/app/components/provider/recoilProvider.jsx'
import './globals.css'

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
            <TabProvider>
              <div className="body">{children}</div>
            </TabProvider>
          </RecoilProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}

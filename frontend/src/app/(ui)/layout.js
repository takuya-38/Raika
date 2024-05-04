'use client'
import { RecoilRoot } from 'recoil'
import { useInitialData } from '@/app/components/hooks/useInitialData'
import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'

export default function UiLayout({ children }) {
  return (
    <div>
      <div className="body">
        <RecoilRoot>
          <InitialDataLoader />
          <Sidebar />
          <main className="main">{children}</main>
        </RecoilRoot>
      </div>
    </div>
  )
}

function InitialDataLoader() {
  useInitialData()
  return null
}

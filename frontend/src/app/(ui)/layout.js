import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'
import RecoilProvider from '@/app/(ui)/recoilProvider'

export default function UiLayout({ children }) {
  return (
    <div>
      <div className="body">
        <RecoilProvider>
          <Sidebar />
          <main className="main">{children}</main>
        </RecoilProvider>
      </div>
    </div>
  )
}

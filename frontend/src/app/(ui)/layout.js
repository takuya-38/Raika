import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'

export default function UiLayout({ children }) {
  return (
    <div>
      <div className="body">
        <Sidebar />
        <main className="main">{children}</main>
      </div>
    </div>
  )
}

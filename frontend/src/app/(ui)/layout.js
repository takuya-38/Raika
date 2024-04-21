import Sidebar from '@/app/components/layouts/sidebar/Sidebar'

export default function UiLayout({ children }) {
  return (
    <div>
      <div className="body">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

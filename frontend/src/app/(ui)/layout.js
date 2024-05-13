import Sidebar from '@/app/components/layouts/Sidebar/Sidebar'

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="main">{children}</main>
    </>
  )
}

'use client'
import FooterComponent from "@/components/Footer"
import NavbarComponent from "@/components/Navbar"
import NotificationComponent from "@/components/Notification"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const {getNotification} = useAppContext()
  // const {isVisible} = getNotification()
  return (
    <>
      <NavbarComponent />
      <div className="grid is-gap-3">
        <div className="cell"></div>
        <div className="cell">
          <NotificationComponent />
        </div>
      </div>
      <section className="container">
        {children}
      </section>
      <FooterComponent />
    </>
  )
}
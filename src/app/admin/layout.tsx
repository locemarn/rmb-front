import FooterComponent from "@/components/Footer"
import NavbarComponent from "@/components/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarComponent />
      <section className="container">
        {children}
      </section>
      <FooterComponent />
    </>
  )
}
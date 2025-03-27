'use client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="grid is-gap-3">
        <div className="cell"></div>
        <div className="cell">
        </div>
      </div>
      <section className="container">
        {children}
      </section>
    </>
  )
}
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-theme min-h-screen font-sans">{children}</div>
}

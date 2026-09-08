import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bloglist App",
  description: "A simple blog list application built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
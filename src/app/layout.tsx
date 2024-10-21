import './globals.css'
import { appName } from '@/utils/utils'
import { Inter } from 'next/font/google'
const golos = Inter({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = { 
  title: appName,
  description: 'Your AI Textewriter',
}

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">

      <body className={golos.className}>{children}</body>
    </html>
  )
}

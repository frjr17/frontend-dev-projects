import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Drum Machine',
  description: 'Prove this online pad',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

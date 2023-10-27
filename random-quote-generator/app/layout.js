import './globals.css'
import { Providers } from './store/provider'


export const metadata = {
  title: 'Random Quote Machine',
  description: 'Look for inspiring quotes',
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

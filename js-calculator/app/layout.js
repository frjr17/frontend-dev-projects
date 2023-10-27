import Providers from './providers'

export const metadata = {
  title: 'Javascript Calculator',
  description: 'A standard calculator using javascript and next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

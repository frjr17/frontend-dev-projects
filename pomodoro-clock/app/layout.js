import Providers from './providers'

export const metadata = {
  title: 'Pomodoro Clock',
  description: 'A clock for helping your pomodoro technique.',
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

import './globals.css'

export const metadata = {
  title: 'Markdown Previewer',
  description: 'Preview your markdown text',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

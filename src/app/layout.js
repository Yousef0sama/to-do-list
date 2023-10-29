
import Head from "next/head"

export const metadata = {
  title: 'To do list',
  description: 'Website developed to record daily tasks, developed by Yousef osama',
  icons:{
    icon: "./icons/favicon.ico?v=4",
    apple: "./icons/apple-touch-icon.png?v=4",
    shortcut: "./icons/apple-touch-icon.png?v=4"
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>{children}</body>
    </html>
  )
}

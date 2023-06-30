import './globals.css'
import { Inter } from 'next/font/google'
import TopNavBar from '@/components/topnavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'REMKstation',
    description: 'remkstation',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className + 'bg-secondary'}>
                <TopNavBar />
                <div className='text-tcolor grid h-screen place-items-center p-9 bg-secondary'>
                    {children}
                </div>
            </body>
        </html>
    )
}

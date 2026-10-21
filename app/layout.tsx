import type { Metadata } from 'next';
import './globals.css';
import './opus.css';
export const metadata: Metadata = {title: 'MNR Achieve | 30 years of experience', description: 'Discover Nambiar Venu Arcade in Bobbili. Luxury apartments at an affordable price. A project by MNR Achieve.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}

'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}

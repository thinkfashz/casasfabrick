import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';
import Footer from '@/components/footer';
import BottomNav from '@/components/bottom-nav';

export const metadata: Metadata = {
  title: 'Casas Fabrick - Construimos Casas, Creamos Historias',
  description: 'Reinventamos la construcción en Chile con un modelo basado en la excelencia, la transparencia y un servicio que te da tranquilidad de principio a fin.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
        </div>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'GPT Model Integration',
  description: 'Chatbot with openai',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-grow">
          <header className="bg-blue-500 text-white text-xl p-4 text-center font-bold">
            <h1>GPT Model Integation</h1>
          </header>
          <main className="flex-grow p-4">
            <div className="container mx-auto max-w-4xl">{children}</div>
          </main>
          <footer className="bg-gray-700 text-white text-center p-4 mt-auto">
            © {currentYear} Joe Burton
          </footer>
        </div>
      </body>
    </html>
  );
}

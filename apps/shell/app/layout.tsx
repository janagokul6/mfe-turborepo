import '@mfe/ui/dist/styles.css';
import Nav from '../components/Nav';
import StoreHydrate from '../components/StoreHydrate';
import { PageContainer } from '@mfe/ui';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <StoreHydrate />
        <Nav />
        <PageContainer>{children}</PageContainer>
      </body>
    </html>
  );
}

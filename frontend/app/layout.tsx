import "./globals.css";

export const metadata = {
  title: "MSL Careers",
  description: "Job opportunities at MSL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "../globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

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
      <body>
        <Nav />
        {/* <Nav /> */}
        <main className="pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

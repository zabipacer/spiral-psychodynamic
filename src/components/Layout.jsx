import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";

/* Wrap every page: <Layout currentPath="/about">...page content...</Layout> */

export default function Layout({ children, currentPath = "/" }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-[#1F2A33]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[#2F5D62] focus:shadow"
      >
        Skip to content
      </a>
      <Header currentPath={currentPath} />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
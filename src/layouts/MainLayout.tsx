import { Outlet } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/common/BackToTop";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function MainLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}

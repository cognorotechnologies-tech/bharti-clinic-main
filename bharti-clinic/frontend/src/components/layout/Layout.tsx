import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartDrawer } from "../shop/CartDrawer";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollToTopButton } from "../ui/ScrollToTopButton";

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory text-charcoal font-body">
            <AnnouncementBar />
            <Navbar />
            <CartDrawer />
            <WhatsAppButton />
            <ScrollToTopButton />

            <main className="flex-1 w-full flex flex-col pt-24">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

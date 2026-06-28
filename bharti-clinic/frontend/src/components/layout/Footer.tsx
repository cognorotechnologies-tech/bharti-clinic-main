import "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function Footer() {
    return (
        <footer className="relative bg-[#FEFCF2] text-maroon overflow-hidden border-t border-lotus/20 pt-16">
            {/* Subtle mandala watermark */}
            <div className="absolute -bottom-1/2 -right-1/4 w-full max-w-[800px] opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-maroon animate-rotate-slow">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: About & Logo */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lotus">
                                <path d="M12 2C12 2 14.5 7 18 8.5C18 8.5 21 6 22 9C22 12 18 15.5 12 22C6 15.5 2 12 2 9C3 6 6 8.5 6 8.5C9.5 7 12 2 12 2Z" fill="currentColor" />
                            </svg>
                            <span className="font-display font-bold text-2xl">Bharti Clinic</span>
                        </Link>
                        <p className="text-charcoal-muted text-sm leading-relaxed">
                            Dedicated to bringing authentic Ayurvedic care to every home through natural solutions for women’s health, joint care, immunity, and holistic well-being.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="https://www.instagram.com/bharticlinicofficial" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-lotus hover:bg-lotus hover:text-white transition-all shadow-sm">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://www.facebook.com/share/1FXE5pnMgL/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-lotus hover:bg-lotus hover:text-white transition-all shadow-sm">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://www.youtube.com/@bharticlinicofficial/videos" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-lotus hover:bg-lotus hover:text-white transition-all shadow-sm">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-display font-semibold text-xl border-b pb-2 border-lotus/30 inline-block">Quick Links</h3>
                        <ul className="flex flex-col gap-3 text-sm text-charcoal">
                            <li><Link to="/about" className="hover:text-lotus transition-colors">About Dr. Ipinder Bharti</Link></li>
                            <li><Link to="/therapies" className="hover:text-lotus transition-colors">Panchkarma Therapies</Link></li>
                            <li><Link to="/shop" className="hover:text-lotus transition-colors">Ayurvedic Shop</Link></li>
                            <li><Link to="/blog" className="hover:text-lotus transition-colors">Wellness Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-lotus transition-colors">Book Consultation</Link></li>
                            <li><Link to="/terms" className="hover:text-lotus transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-display font-semibold text-xl border-b pb-2 border-lotus/30 inline-block">Visit Us</h3>
                        <ul className="flex flex-col gap-4 text-sm text-charcoal">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-lotus shrink-0 mt-0.5" />
                                <span>SCO-5, Panorama Complex, Sector-115, S.A.S. NAGAR, Mohali (Punjab) 140307</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-lotus shrink-0" />
                                <a href="tel:+918288842777" className="hover:text-lotus transition-colors">+91 82 888 42 777</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-lotus shrink-0" />
                                <a href="mailto:info.bhartiveda@gmail.com" className="hover:text-lotus transition-colors">info.bhartiveda@gmail.com</a>
                            </li>
                        </ul>
                        <div className="mt-2 p-4 bg-white rounded-xl shadow-sm border border-ivory-100">
                            <p className="font-medium text-maroon mb-1">Clinic Hours</p>
                            <p className="text-sm text-charcoal-muted">Mon – Sat: 9:00 AM – 8:00 PM</p>
                            <p className="text-sm text-charcoal-muted">Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Column 4: Newsletter & Map Placeholder */}
                    <div className="flex flex-col gap-6">
                        <h3 className="font-display font-semibold text-xl border-b pb-2 border-lotus/30 inline-block">Stay Connected</h3>
                        <p className="text-sm text-charcoal-muted">Subscribe for Ayurvedic wellness tips and exclusive offers.</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex gap-2">
                                <Input type="email" placeholder="Email Address" className="bg-white" required />
                                <Button type="submit" variant="primary" className="shrink-0 px-6">Join</Button>
                            </div>
                        </form>

                        {/* Map Placeholder */}
                        <a href="https://www.google.com/maps/place/Bharti+Clinic+%E2%80%9CAyurveda+%26+Panchkarma+Centre+%E2%80%9C/@30.7229239,76.6475157,17z/data=!4m12!1m2!2m1!1sbhartiveda!3m8!1s0x390fefdf37095e1f:0x7a546a2f1ba05881!8m2!3d30.7229239!4d76.6522793!9m1!1b1!15sCgpiaGFydGl2ZWRhWgwiCmJoYXJ0aXZlZGGSARBheXVydmVkaWNfY2xpbmlj4AEA!16s%2Fg%2F11c5gphtl3" target="_blank" rel="noopener noreferrer" className="mt-4 w-full h-32 rounded-xl bg-charcoal/5 flex items-center justify-center overflow-hidden relative border border-ivory-100 group">
                            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=30.7229239,76.6522793&zoom=15&size=400x150&sensor=false')] bg-cover bg-center opacity-60 mix-blend-multiply transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"></div>
                            <div className="z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs font-bold text-maroon flex items-center gap-1.5 hover:bg-maroon hover:text-white transition-colors duration-300">
                                <MapPin className="h-3 w-3" /> View on Maps
                            </div>
                        </a>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-lotus/10 bg-white/50 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
                    <p>© {new Date().getFullYear()} Bharti Clinic & Bhartiveda. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        Made with <span className="text-lotus text-sm mx-0.5">♡</span> for wellness
                    </div>
                </div>
            </div>
        </footer>
    );
}

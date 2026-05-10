import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-navy-500 text-ivory-100">
      {/* Main footer content */}
      <div className="page-container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gold-400 flex items-center justify-center shadow-lg">
                <i className="fas fa-paw text-navy-500 text-base"></i>
              </div>
              <span className="text-xl font-extrabold">My<span className="text-gold-400">Pet</span></span>
            </div>
            <p className="text-ivory-100/50 text-sm leading-relaxed mb-6">Premium pet care center dedicated to the highest quality veterinary services, grooming, and lifestyle solutions.</p>
            <div className="flex gap-3">
              {[
                { icon: 'fa-facebook-f', label: 'Facebook' },
                { icon: 'fa-instagram', label: 'Instagram' },
                { icon: 'fa-twitter', label: 'Twitter' },
              ].map((s, i) => (
                <button key={i} aria-label={s.label} className="w-9 h-9 rounded-xl bg-ivory-100/8 border border-ivory-100/10 flex items-center justify-center text-ivory-100/50 hover:bg-gold-400 hover:text-navy-500 hover:border-gold-400 transition-all text-sm">
                  <i className={`fab ${s.icon}`}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-ivory-100 mb-5 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/shop', label: 'Pet Shop' },
                { href: '/doctors', label: 'Our Doctors' },
                { href: '/appointment', label: 'Book Appointment' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ivory-100/50 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group">
                    <i className="fas fa-chevron-right text-[8px] text-gold-400/0 group-hover:text-gold-400/100 transition-all -ml-1 group-hover:ml-0"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-ivory-100 mb-5 text-xs uppercase tracking-widest">Our Services</h4>
            <ul className="space-y-3">
              {['Veterinary Care', 'Grooming', 'Pet Daycare', 'Overnight Boarding', 'Emergency Care', 'Dog Training'].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-ivory-100/50 hover:text-gold-400 text-sm transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-ivory-100 mb-5 text-xs uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="fas fa-map-marker-alt text-gold-400 text-xs"></i>
                </div>
                <div>
                  <p className="text-ivory-100/80 text-sm font-medium">123 Pet Ave</p>
                  <p className="text-ivory-100/40 text-xs mt-0.5">Pawville, CA 90210</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-gold-400 text-xs"></i>
                </div>
                <div>
                  <p className="text-ivory-100/80 text-sm font-medium">(555) 123-4567</p>
                  <p className="text-ivory-100/40 text-xs mt-0.5">Mon – Sat, 8am – 8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-gold-400 text-xs"></i>
                </div>
                <div>
                  <p className="text-ivory-100/80 text-sm font-medium">hello@mypet.care</p>
                  <p className="text-ivory-100/40 text-xs mt-0.5">We reply within 24 hours</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ivory-100/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory-100/35 text-xs">&copy; 2026 MyPet. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="text-ivory-100/35 text-xs cursor-default hover:text-gold-400 transition-colors">Privacy Policy</span>
            <span className="text-ivory-100/20 text-xs">·</span>
            <span className="text-ivory-100/35 text-xs cursor-default hover:text-gold-400 transition-colors">Terms of Service</span>
            <span className="text-ivory-100/20 text-xs">·</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-ivory-100/35 text-xs">All systems normal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

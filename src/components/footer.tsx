import Link from "next/link";
import {
  Heart,
  MapPin,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Find Host Families", href: "/matches" },
      { label: "Find Au Pairs", href: "/matches" },
      { label: "Pricing", href: "/pricing" },
      { label: "Safety & Security", href: "/about" },
    ],
    support: [
      { label: "Help Center", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
      { label: "Community Guidelines", href: "/terms" },
      { label: "Success Stories", href: "/about" },
      { label: "Blog", href: "/about" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/privacy" },
      { label: "User Agreement", href: "/terms" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
      { label: "Partnerships", href: "/contact" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/aupairconnect",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/aupairconnect",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/aupairconnect",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/aupairconnect",
      label: "LinkedIn",
    },
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Cultural Exchange Ave",
      country: "United States",
    },
    {
      city: "London",
      address: "456 International St",
      country: "United Kingdom",
    },
    { city: "Berlin", address: "789 Au Pair Platz", country: "Germany" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-primary mr-2" />
              <span className="text-xl font-bold">Au Pair Connect</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              Connecting families and au pairs worldwide for meaningful cultural
              exchanges. Safe, trusted, and life-changing experiences since
              2020.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Our Global Offices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4 text-primary mr-2" />
                  <span className="font-medium">{office.city}</span>
                </div>
                <p className="text-sm text-gray-300">{office.address}</p>
                <p className="text-sm text-gray-300">{office.country}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Get updates on new features and success stories
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
              <button className="px-6 py-2 bg-primary hover:bg-primary-600 rounded-r-lg transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center mb-4 md:mb-0">
              <Globe className="w-4 h-4 mr-2" />
              <span>
                © {currentYear} Au Pair Connect. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Available in 50+ countries</span>
              <span>•</span>
              <span>24/7 Support</span>
              <span>•</span>
              <span>Trusted by 10,000+ families</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

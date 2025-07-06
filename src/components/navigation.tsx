"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  Heart,
  Menu,
  X,
  User,
  LogOut,
  MessageCircle,
  Users,
  FileText,
  Calendar,
} from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  useEffect(() => {}, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    }
  };

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  // Public navigation items
  const publicNavItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  // Authenticated navigation items
  const authenticatedNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/matches", label: "Matches", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/bookings", label: "Bookings", icon: Calendar },
    { href: "/documents", label: "Documents", icon: FileText },
  ];

  if (isLoading) {
    return (
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Au Pair Connect
              </span>
            </Link>
            <div className="animate-pulse">
              <div className="h-10 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Au Pair Connect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {authenticatedNavItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.full_name || user?.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center space-x-3 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation("/auth/login")}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleNavigation("/auth/register")}
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn-touch"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user?.full_name || user?.email}
                      </span>
                    </div>
                  </div>
                  {authenticatedNavItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {publicNavItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex flex-col space-y-2 mt-4 px-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigation("/auth/login")}
                      className="btn-touch"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleNavigation("/auth/register")}
                      className="btn-touch"
                    >
                      Get Started
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import { Menu, LayoutDashboard, LogOut, User, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth.services";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserInfo } from "@/types/user.types";
import { ISiteSetting } from "@/types/siteSetting.types";
import { getDefaultDashboardRoute, getProfileRoute } from "@/lib/authUtils";

import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

interface NavbarProps {
  className?: string;
  userInfo?: UserInfo | null;
  siteSettings?: ISiteSetting | null;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blogs" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const Navbar = ({ userInfo, className, siteSettings }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const siteName = siteSettings?.siteName || "Bangladeshi IT";
  const tagline = siteSettings?.tagline;
  const logo = siteSettings?.logo;

  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/dashboard";

  const profileRoute = userInfo
    ? getProfileRoute(userInfo.role)
    : "/dashboard/my-profile";

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
    router.refresh();
  };

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Desktop Menu */}
        <nav className="hidden h-20 items-center justify-between lg:flex">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                {logo ? (
                  <Image src={logo} alt={siteName} fill sizes="40px" className="object-cover" />
                ) : (
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-foreground">
                  {siteName}
                </span>
                {tagline && (
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                    {tagline}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold text-muted-foreground hover:text-primary transition-colors",
                  pathname === link.href && "text-primary",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all hover:ring-primary/40"
                  >
                    {userInfo.image ? (
                      <Image
                        src={userInfo.image}
                        alt={userInfo.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 mt-2"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 px-1 py-1.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-semibold leading-none">
                          {userInfo.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate max-w-[150px]">
                          {userInfo.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer py-2.5">
                    <Link href={dashboardRoute} className="flex items-center">
                      <LayoutDashboard className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer py-2.5">
                    <Link href={profileRoute} className="flex items-center">
                      <User className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full px-5 font-bold shadow-md shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
              {logo ? (
                <Image src={logo} alt={siteName} fill sizes="32px" className="object-cover" />
              ) : (
                <Building2 className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
            <span className="text-lg font-black tracking-tight">
              {siteName}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] border-l-0 p-0"
              >
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-6 border-b text-left">
                    <div className="flex items-center justify-between">
                      <SheetTitle>
                        <Link href="/" className="flex items-center gap-2">
                          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
                            {logo ? (
                              <Image src={logo} alt={siteName} fill sizes="32px" className="object-cover" />
                            ) : (
                              <Building2 className="h-5 w-5 text-primary-foreground" />
                            )}
                          </div>
                          <span className="text-xl font-black tracking-tight">
                            {siteName}
                          </span>
                        </Link>
                      </SheetTitle>
                    </div>
                    <SheetDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">
                      {tagline || "IT Solutions & Services"}
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto py-6 px-6">
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <SheetTrigger asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="flex items-center h-12 rounded-xl px-4 font-semibold text-sm hover:bg-muted transition-colors"
                          >
                            {link.name}
                          </Link>
                        </SheetTrigger>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t bg-muted/30">
                    {userInfo ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 mb-2 px-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            {userInfo.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">
                              {userInfo.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {userInfo.email}
                            </span>
                          </div>
                        </div>

                        <Button
                          asChild
                          variant="outline"
                          className="justify-start gap-3 h-12 rounded-xl"
                        >
                          <Link href={dashboardRoute}>
                            <LayoutDashboard className="size-5 text-primary" />
                            Dashboard
                          </Link>
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={handleLogout}
                          className="justify-start gap-3 h-12 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                        >
                          <LogOut className="size-5" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            asChild
                            variant="outline"
                            className="h-12 rounded-xl font-bold"
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="h-12 rounded-xl font-bold"
                          >
                            <Link href="/register">Sign up</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

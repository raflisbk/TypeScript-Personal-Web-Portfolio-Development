"use client";
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Sidebar() {
  const [open, setOpen] = useState(false)

  const toggleSidebar = () => setOpen(!open)

  const navItems = [
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] futuristic-bg">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="text-2xl font-bold text-primary neon-text" onClick={toggleSidebar}>
              DS Portfolio
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
                onClick={toggleSidebar}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}


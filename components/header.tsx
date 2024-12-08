import Link from 'next/link'
import { Sidebar } from './sidebar'

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary neon-text">
          Mohamad Rafli Agung Subekti
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link href="/#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</Link>
          <Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
          <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </nav>
        <Sidebar />
      </div>
    </header>
  )
}


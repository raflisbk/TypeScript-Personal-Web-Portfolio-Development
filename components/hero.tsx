"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden futuristic-bg py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-y-0 right-0 -z-10 w-[40%] bg-gradient-to-l from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute inset-y-0 left-0 -z-10 w-[40%] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl neon-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
          >
            Data Science Enthusiast
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-6"
          >
            <Button size="lg" asChild className="rounded-full glow hover-glow">
              <Link href="#projects">Lihat Proyek</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full border-primary/50 hover:border-primary">
              <Link href="https://medium.com/@raflisbk" target="_blank" rel="noopener noreferrer">
                Baca Blog
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


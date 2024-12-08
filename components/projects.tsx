"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { getGitHubProjects, Project } from '@/lib/github'

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true)
        const githubProjects = await getGitHubProjects('raflisbk')
        
        // Urutkan proyek berdasarkan jumlah bintang (opsional)
        const sortedProjects = githubProjects.sort((a, b) => (b.stars || 0) - (a.stars || 0))
        
        setProjects(sortedProjects)
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Terjadi kesalahan saat mengambil proyek. Silakan coba lagi nanti.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProjects()
  }, [])

  if (isLoading) {
    return (
      <div className="text-center py-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Memuat proyek...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 mx-auto mb-4 text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        {error}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 mx-auto mb-4 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        Yah kena limit API.
      </div>
    )
  }

  return (
    <section id="projects" className="py-24 sm:py-32 futuristic-bg">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 neon-text">
            Portofolio Proyek
          </h2>
          <p className="text-muted-foreground">
          Berikut adalah beberapa proyek yang pernah saya kerjakan, Untuk melihat seluruh proyek saya lebih lengkap, Anda dapat mengunjungi halaman GitHub saya.
          </p>
        </div>
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem 
                key={project.id} 
                className="md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: Math.min(index * 0.1, 0.5) 
                  }}
                  className="p-1 h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="glow hover-glow" />
            <CarouselNext className="glow hover-glow" />
          </div>
        </Carousel>
      </motion.div>
    </section>
  )
}

"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/project-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { getGitHubProjects, Project } from '@/lib/github'
import Link from 'next/link'
import { Loader2, AlertCircle, GithubIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true)
        const githubProjects = await getGitHubProjects('raflisbk')
        setProjects(githubProjects)
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

  const MessageCard = ({ title, description, icon, buttonText, buttonLink }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    buttonText: string;
    buttonLink: string;
  }) => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Jika Anda mengalami kesulitan dalam mengakses proyek-proyek saya atau mengalami loading yang terus-menerus, hal ini disebabkan resource API yang terbatas.
          Silahkan kunjungi profil GitHub saya untuk melihat portofolio dan proyek-proyek terbaru.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href={buttonLink} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="mr-2 h-4 w-4" /> {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <MessageCard
          title="Memuat Proyek"
          description="Mohon tunggu sebentar..."
          icon={<Loader2 className="h-12 w-12 animate-spin text-primary" />}
          buttonText="Lihat Profil GitHub"
          buttonLink="https://github.com/raflisbk"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <MessageCard
          title="Terjadi Kesalahan"
          description={error}
          icon={<AlertCircle className="h-12 w-12 text-destructive" />}
          buttonText="Lihat Profil GitHub"
          buttonLink="https://github.com/raflisbk"
        />
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <MessageCard
          title="Tidak Ada Proyek"
          description="Tidak ada proyek yang ditemukan saat ini."
          icon={<GithubIcon className="h-12 w-12 text-muted-foreground" />}
          buttonText="Lihat Profil GitHub"
          buttonLink="https://github.com/raflisbk"
        />
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 neon-text">Portofolio Project</h2>
          <p className="text-muted-foreground">
            Here are the projects that I have worked on.
          </p>
        </div>
        <Carousel 
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-1"
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

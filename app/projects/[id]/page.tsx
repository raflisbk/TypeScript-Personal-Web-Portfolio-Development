import { getGitHubProjects, Project } from '@/lib/github'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

type Params = {
  id: string
}

type Props = {
  params: Params
}

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await getGitHubProjects('raflisbk')
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: Props) {
  const projects = await getGitHubProjects('raflisbk')
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Button variant="ghost" asChild className="mb-8 hover:bg-transparent">
        <Link href="/#projects" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Proyek
        </Link>
      </Button>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-lg mb-6">{project.description}</p>
        <h2 className="text-2xl font-semibold mb-4">README.md</h2>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{project.readme}</ReactMarkdown>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              Lihat Proyek di GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


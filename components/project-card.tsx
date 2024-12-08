import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileCode, Star, ExternalLink } from 'lucide-react'
import { Project } from '@/lib/github'

interface ProjectCardProps {
  project: Project
}

function getLanguageIcon(language: string | null | undefined) {
  return <FileCode className="h-6 w-6 text-primary" />
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Fungsi untuk memotong deskripsi jika terlalu panjang
  const truncateDescription = (desc: string, maxLength = 150) => 
    desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc

  return (
    <Card className="hover-glow bg-black/50 backdrop-blur-sm border-primary/20 h-full flex flex-col transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center gap-4">
        {getLanguageIcon(project.language)}
        <div className="flex-1 overflow-hidden">
          <CardTitle className="text-xl neon-text truncate">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="mb-6 flex-1 text-muted-foreground">
          {truncateDescription(project.description)}
        </CardDescription>
        <div className="flex justify-between items-center mt-4">
          {project.language && (
            <span className="text-sm text-muted-foreground flex items-center">
              {getLanguageIcon(project.language)}
              <span className="ml-2">{project.language}</span>
            </span>
          )}
          {project.stars !== undefined && project.stars > 0 && (
            <span className="text-sm text-muted-foreground flex items-center">
              <Star className="w-4 h-4 mr-1" /> {project.stars}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-primary/50 hover:border-primary glow hover-glow" 
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              Lihat Detail
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-auto border-primary/50 hover:border-primary glow hover-glow" 
            asChild
          >
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
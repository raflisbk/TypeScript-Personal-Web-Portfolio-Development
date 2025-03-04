import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">About</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-64 h-64 relative rounded-full overflow-hidden">
            <Image
              src="/foto.jpg"
              alt="Foto Profil Mohamad Rafli Agung Subekti"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="max-w-xl text-center md:text-left">
            <p className="text-lg text-muted-foreground mb-6">
              Hello!
              I'm Subek, a fresh graduate in Informatics with a focus as Data Scientist, Machine Learning Engineer, and AI Enthusiast. 
              I am passionate about processing and analysing data to uncover hidden patterns and generate insights that can be used for data-driven decision making. With expertise in machine learning, deep learning, and AI, I am committed to developing innovative solutions that can make a real impact in various industries.            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Through my various projects, I have proven how machine learning and AI algorithms can be practically applied to solve real-world problems, ranging from computer vision, NLP, to predictive analytics. I am always interested in exploring new technologies and optimising AI models to be more efficient and accurate. 
            </p>
            <Button variant="outline" asChild>
              <Link href="https://www.linkedin.com/in/mohamad-rafli-agung-subekti-640a77285/" target="_blank">
                Lihat Profil LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


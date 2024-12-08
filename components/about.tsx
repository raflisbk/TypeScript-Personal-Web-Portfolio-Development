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
              Halo!
              Saya Subek, freshgraduate di bidang Informatika dengan fokus sebagai Data Scientist. 
              Saya memiliki antusiasme besar dalam menganalisis data untuk mengungkap cerita dan wawasan penting yang dapat memberikan solusi nyata dan bermanfaat.            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Lewat berbagai proyek yang saya kerjakan, saya menunjukkan bagaimana algoritma machine learning bisa diterapkan secara praktis untuk menyelesaikan masalah nyata. 
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


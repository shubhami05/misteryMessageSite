'use client'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import carouselMessages from '@/messages.json'
import { Mail } from 'lucide-react'


const Home = () => {

  return (
    <main className='min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl font-bold'>
          Dive into the World of Anonymous feedback
        </h1>
        <p className='mt-3 md:mt-4 text-base md:text-lg'>
          True feedback - Where your identity remains a secret
        </p>
      </section>

      <section className='text-left mb-8 md:mb-12'>
      <Carousel
          plugins={[Autoplay({ delay: 3500 })]}
          className="px-4 w-screen max-w-lg md:max-w-xl"
        >
      <CarouselContent>
        {
          carouselMessages.map((msg,index)=>(
            <CarouselItem key={index} className='p-4' >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {msg.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4 ">
                  <Mail className='flex-shrink-0'/>
                  <div>
                      <p className='font-semibold'>{msg.content}</p>
                      <p className="text-sm text-muted-foreground">
                        {msg.received}
                      </p>
                    </div>
                </CardContent>
              </Card>

            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious variant='secondary' />
      <CarouselNext variant='secondary'/>
    </Carousel>
        
      </section>
    </main>
  )
}

export default Home

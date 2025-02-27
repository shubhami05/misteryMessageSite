"use client"
import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import carouselMessages from "@/messages.json"
import { Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"


const Home = () => {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-gray-800">
      <section className="text-center flex flex-col items-center justify-center gap-10 min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold">
          Dive into the World of Anonymous feedback
        </h1>
        <p className="mt-3 px-3 md:mt-4 text-base md:text-lg">
          True feedback - Where your identity remains a secret
        </p>

        <Carousel
          plugins={[Autoplay({ delay: 3500 })]}
          className="max-w-xs md:max-w-lg mt-10"
        >
          <CarouselContent className="text-left">
            {
              carouselMessages.map((msg, index) => (
                <CarouselItem key={index} className="pl-5 pr-3 py-5" >
                  <Card className="drop-shadow-lg">
                    <CardHeader>
                      <CardTitle >
                        {msg.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4 ">
                      <Mail className="flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{msg.content}</p>
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
          <CarouselPrevious className="hidden md:flex items-center" variant="default" />
          <CarouselNext className="hidden md:flex items-center" variant="default" />
        </Carousel>
      </section>
      <Separator className="w-full" />
      <section className="px-1 md:px-4 w-full max-w-xl min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-xl md:text-3xl text-center font-bold">Frequently Asked Questions?</h1>
        <Accordion type="multiple" className="text-left px-1 max-w-sm md:min-w-full 
         ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it free to Signup?</AccordionTrigger>
            <AccordionContent>
              Yes. It is absolutely free to signup in Mystery message.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free to send messages?</AccordionTrigger>
            <AccordionContent>
              Yes. It is absolutely free to send message to anyone in Mystery message.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">Can users see my details when I send message to them?</AccordionTrigger>
            <AccordionContent>
              No, your details will be completely hidden from other user and it will be anonymous message.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </section>
    </main>
  )
}

export default Home

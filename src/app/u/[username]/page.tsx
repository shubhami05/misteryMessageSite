'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useCompletion } from 'ai/react'
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { messageSchema } from "@/schemas/messageSchema"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { ApiResponse } from "@/types/ApiResponse"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Footer from "@/components/Footer"


const specialCharacter = '||'
const parseStringMessage = (messageString: string): string[] => {
  return messageString.split(specialCharacter);
}
const initialMessage = "Which is your favorite movie?||Do you have any pets?||which is your dream job?"

export default function SendMessagePage() {

  const params = useParams<{ username: string }>()
  const username = params.username;
  const { toast } = useToast()
  const [isSending, setIsSending] = useState(false)
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  })
  const {
    complete,
    completion,
    isLoading: isSuggesting,
    error } = useCompletion({
      api: '/api/suggest-messages',
      initialCompletion: initialMessage,
    });

  const messageContent = form.watch('content');
  async function hadnleMessageClick(message: string) {
    form.setValue('content', message);
  }
  async function onSubmit(content: z.infer<typeof messageSchema>) {
    setIsSending(true)
    console.log(content)
    try {
      const response = await axios.post<ApiResponse>('/api/sendMessage', { username, ...content })
      console.log("frnt", response)
      toast({
        title: `Message sent to ${username}`,
        duration: 3000
      })
      form.reset({ ...form.getValues(), content: '' });

    }
    catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    }
    finally {
      setIsSending(false)
    }
  }
  async function suggestClick() {

    toast({
      title:"Info",
      description:"This section is under developement, sorry for inconvience!",
      variant:"destructive",
      duration:3000
    })
    // try {
    //   complete('');
    // } catch (error) {
    //   console.log("Error in fetching message:", error);
    //   toast({
    //     title: "Something went wrong",
    //     description: "This feature is under development! Sorry for inconvience!"
    //   })
    // }

  }

  return (
    <>
      <main className=' py-5 min-h-screen bg-slate-50'>
        <div className='container-sm'>
          <h1 className='text-center text-3xl md:text-4xl font-bold text-slate-800 font-sans mb-5 '>
            Public Profile Link
          </h1>
          <h4 className='px-1 md:px-2 text-center text-md md:text-xl font-medium my-10'>
            Welcome to <Link className="text-blue-700 transition-all hover:text-blue-900 " href={'/'}>Mystery Message</Link> ,<br /> Here you can send anonymous messages to an user.
          </h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-11/12 md:w-2/3 max-w-lg space-y-6 m-auto">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Enter message to send @{params.username}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your message"
                        className="block"

                        {...field}
                      />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSending || !messageContent}>
                {
                  isSending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Sending
                    </>
                  ) : ('Send')
                }
              </Button>
              <Button className="btn-dark mx-2"
                type="button"
                disabled={isSuggesting}
                onClick={suggestClick}
              >
                {
                  isSuggesting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Suggesting
                    </>
                  ) : ('Suggest Message')
                }
              </Button>
            </form>
          </Form>

          <Separator className="my-10" />

          <section className="container max-w-xl">
            <Card className="pt-5">
              <CardTitle className="text-center text-2xl font-sans font-bold text-slate-800 ">
                Message Suggestions
              </CardTitle>
              <CardDescription className="py-1 text-center">
                Click on message to insert directly!
              </CardDescription>
              <CardContent className="mt-5 flex flex-col gap-2">
                {
                  error ? (
                    <p>It is under developement</p>
                  ) : (
                    parseStringMessage(completion).map((message, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="mb-2 shadow-md"
                        onClick={() => hadnleMessageClick(message)}
                      >
                        {message}
                      </Button>
                    ))
                  )
                }
              </CardContent>
            </Card>
          </section>
        </div>

        <Toaster />
      </main>
      <Footer />
    </>

  )
}
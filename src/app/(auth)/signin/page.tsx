"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchems"
import { signIn } from "next-auth/react"


const SigninPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmitForm = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                identifier: data.identifier,
                password: data.password
            })
            if (result?.error) {
                if (result.error === "Error: Invalid credentials!") {
                    toast({
                        title: "Login Failed",
                        description: "Incorrect username or password",
                        duration: 5000,
                        variant: "destructive"
                    });
                } else {
                    toast({
                        title: "Error",
                        description: result.error || "Unknown error",
                        variant: "destructive",
                    });
                }
            }
            if (result?.url) {
                toast({
                    title: "Success",
                    description: "Login Successfully",
                    variant: "default"
                })
                router.replace("/dashboard")
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: "erroert",
                variant: "destructive",
            });
        }
        finally {

            setIsSubmitting(false);
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg ">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
                    <p className="mb-4">Sign in to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email or Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email or Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                    </>
                                ) : ("Sign in")
                            }
                        </Button>
                    </form>
                </Form>
                <div>
                    <p className="text-center">
                        Don"t have an account? {` `}
                        <Link href={"/signup"} className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SigninPage
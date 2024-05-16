'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

import { Moon, Sun } from "lucide-react"


const Navbar = () => {
    const location = usePathname()
    const { data: session } = useSession()
    const user: User = session?.user as User


    return (
        <nav className='p-4 md:p-6 w-full shadow-lg sticky top-0 bg-white z-50'>
            <div className='container mx-auto flex flex-col md:flex-row md:justify-between items-center'>
                <Link href={'/'} className='text-xl font-bold mb-4 md:mb-0'>Mystery Message</Link>
                {
                    session ?
                        (
                            <div className='flex flex-col md:flex-row gap-2 '>
                                <span className='flex flex-col justify-center items-center'>Welcome, {user.username || user.email}</span>
                                <div className='flex flex-row gap-2 pb-2 md:pb-0'>
                                    <Button className='md:align-right' >
                                        {
                                            location == '/' ? (
                                                <Link href={'/dashboard'}>
                                                    Dashboard
                                                </Link>
                                            ) : (
                                                <Link href={'/'}>
                                                    Home
                                                </Link>
                                            )
                                        }

                                    </Button>
                                    <Button className='md:align-right' onClick={() => signOut()}>Logout</Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href={'/signin'}>
                                    <Button>Login</Button>
                                </Link>
                            </>

                        )
                }
                
            </div>
        </nav>
    )
}

export default Navbar

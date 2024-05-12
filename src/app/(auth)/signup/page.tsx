'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="bg-red-200 text-black font-bold px-3 py-1 rounded m-4 cursor-pointer hover:bg-red-300  transition-all" onClick={() => signIn()}>Sign in</button>
    </>
  )
}
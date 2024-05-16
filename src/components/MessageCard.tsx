'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Message } from '@/model/User'
import { useToast } from './ui/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import axios from 'axios'
import dayjs from 'dayjs'


type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void
}


const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

    const { toast } = useToast()
    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(`/api/deleteMessage/${message._id}`);
        onMessageDelete(message._id);
    }
    const messageData = {
        date: dayjs(message.createdAt).format('MMM D, YYYY   h:mm A'),
        content: message.content
    }
    return (
        <Card className='mr-4 md:mr-0'>
            <CardHeader className='flex-row justify-between pt-2 pr-3'>
                <CardDescription className='pt-3'>{messageData.date}</CardDescription>
                {/* <CardTitle>Card Title</CardTitle> */}
                <AlertDialog>
                    <AlertDialogTrigger asChild className='w-full relative '>
                        <Button variant="destructive" className='w-8 h-8 mt-0'><X className='w-full min-h-6 min-w-6 h-full' /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                message and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardHeader>
            <CardContent className='break-words'>
                {messageData.content}
            </CardContent>

        </Card>

    )
}

export default MessageCard

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {
                status: 401
            }
        )
    }

    const user: User = session?.user as User

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const userMsg = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])
        if (!userMsg || userMsg.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Messages not found"
                },
                {
                    status: 202
                }
            )
        }
        return Response.json(
            {
                success: true,
                messages: userMsg[0]?.messages
            },
            {
                status: 200
            }
        )
    }
    catch (error) {
        console.log("Failed to get user messages",error)
        return Response.json(
            {
                success: false,
                message: "Failed to get user messages"
            },
            {
                status: 500
            }
        )
    }
}
import UserModel from "@/model/User";
import { User, getServerSession } from 'next-auth'
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    const messageId = params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                sucess: false,
                message: "Not authenticated"
            },
            {
                status: 401
            }
        )
    }

    try {
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        );
        console.log(updateResult);
        if (updateResult.modifiedCount === 0) {
            return Response.json(
                {
                    sucess: false,
                    message: "Message not found or already deleted"
                },
                {
                    status: 404
                }
            )
        }

        return Response.json(
            {
                sucess: true,
                message: "Message Deleted"
            },
            {
                status: 200
            }
        )
    }
    catch (error) {
        console.log("Error in message delete route ")
        return Response.json(
            {
                sucess: false,
                message: "Error in deleting message"
            },
            {
                status: 500
            }
        )
    }
}
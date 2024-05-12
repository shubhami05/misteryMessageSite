import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()

    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        //zod validation
        const result = usernameQuerySchema.safeParse(queryParam)
        console.log(result) //TODO: REMOVE

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0
                        ? usernameErrors.join(', ')
                        : "Invalid query parameters",
                },
                {
                    status:400
                }
            )
        }

        const {username} = result.data;

        const exisitingVerififedUser = await UserModel.findOne({username,isVerified:true})

        if(exisitingVerififedUser){
            return Response.json(
                {
                    success:false,
                    message: "Username is already taken"
                },
                {
                    status:400
                }
            )
        }
        return Response.json(
            {
                success:true,
                message: "Username is available"
            },
            {
                status:200
            }
        )

    } catch (error) {
        console.log("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }

}
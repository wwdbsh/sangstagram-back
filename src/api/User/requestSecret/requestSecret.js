import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default{
    Mutation:{
        requestSecret: async (_, args, {request}) => {
            const { email } = args;
            const loginSecret = generateSecret();
            console.log(loginSecret);
            try{
                // await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return loginSecret; // temporary logic because it's not using email confirm now
                // return true; // change to using email confirm later
            }catch(e){
                console.log(e);
                return "";
                // return false;
            }
        }
    }
}
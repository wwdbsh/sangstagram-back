import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        searchPost: async (_, args) => prisma.posts({where:{
            OR:[
                {locations_starts_with:args.term},
                {caption_starts_with:args.term},
            ]}
        })
    }
}
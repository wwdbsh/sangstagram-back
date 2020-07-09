import { prisma } from "../../../generated/prisma-client";

export default{
    Post:{
        isLiked: (parent, _, { request }) => {
            const { user } = request;
            const { id:parentId } = parent;
            return prisma.$exists.like({
                AND:[
                    {
                        user:{
                            id:user.id
                        }
                    },
                    {
                        post:{
                        id:parentId
                    }}
                ]
            });
        },
        likeCount: (parent) => prisma.likesConnection({where:{ id:parent.id }}).aggregate().count()
    }
}
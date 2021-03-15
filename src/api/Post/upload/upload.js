import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        upload: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, files, locations } = args;
            const post = await prisma.createPost({
                caption,
                locations,
                user:{
                    connect:{
                        id:user.id
                    }
                }
            });
            files.forEach(async file => {
                await prisma.createFile({
                    url:file,
                    post:{
                        connect:{
                            id:post.id
                        }
                    }
                })
            });
            return post;
        }
    }
}
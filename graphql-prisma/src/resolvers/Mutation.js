import uuidv4 from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, {
        prisma
    }, info) {
        const {
            data
        } = args
        const emailTaken = await prisma.exists.User({
            email: data.email
        })

        if (emailTaken) {
            throw new Error('Email already registered.')
        }

        return prisma.mutation.createUser({
            data
        }, info)

    },
    async deleteUser(parent, args, {
        prisma
    }, info) {
        const {
            id
        } = args
        const userExists = await prisma.exists.User({
            id
        })

        if (!userExists) {
            throw new Error('User not found.')
        }

        return prisma.mutation.deleteUser({
            where: {
                id
            }
        }, info)

    },
    async updateUser(parent, args, {
        prisma
    }, info) {
        const {
            id,
            data
        } = args

        const userExists = await prisma.exists.User({
            id
        })

        if (!userExists) {
            throw new Error('User not found.')
        }

        return prisma.mutation.updateUser({
            where: {
                id
            },
            data
        }, info)
    },
    async createPost(parent, args, {
        prisma
    }, info) {
        const {
            data
        } = args
        const userExists = prisma.exists.User({
            id: data.author
        })

        if (!userExists) {
            throw new Error('User not found.')
        }

        return prisma.mutation.createPost({
            data: {
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                    connect: {
                        id: data.author
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, {
        prisma
    }, info) {
        const {
            id
        } = args
        const postExists = await prisma.exists.Post({
            id
        })

        if (!postExists) {
            throw new Error('Post not found.')
        }

        return prisma.mutation.deletePost({
            where: {
                id
            }
        }, info)
    },
    updatePost(parent, args, {
        prisma
    }, info) {
        const {
            id,
            data
        } = args
        const postExists = prisma.exists.Post({
            id
        })

        if (!postExists) {
            throw new Error('Post not found.')
        }
        return prisma.mutation.updatePost({
            where: {
                id
            },
            data
        }, info)
    },
    async createComment(parent, args, {
        prisma
    }, info) {
        const {
            data
        } = args

        const userExists = await prisma.exists.User({
            id: args.author
        })

        if (!userExists) {
            throw new Error('User not found.')
        }

        const postExists = await prisma.exists.Post({
            id: args.post
        })

        if (!postExists) {
            throw new Error('Post not found.')
        }

        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect: {
                        id: data.author
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
            }
        }, info)
    },
    async deleteComment(parent, args, {
        prisma
    }, info) {
        const {
            id
        } = args
        const commentExists = prisma.exists.Comment({
            id
        })

        if (!commentExists) {
            throw new Error('Comment not found.')
        }

        return prisma.mutation.deleteComment({
            where: {
                id
            }
        }, info)
    },
    async updateComment(parent, args, {
        prisma
    }, info) {
        const {
            id,
            data
        } = args

        const commentExists = prisma.exists.Comment({
            id
        })

        if (!commentExists) {
            throw new Error('Comment not found.')
        }

        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        }, info)
    }

}

export {
    Mutation as
    default
}
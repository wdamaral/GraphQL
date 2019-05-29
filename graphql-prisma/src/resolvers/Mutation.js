import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken'
import getUserId from '../utils/getUserId'
import hashPassword from '../utils/hashPassword'

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

        const password = await hashPassword(data.password)
        const user = await prisma.mutation.createUser({
            data: {
                ...data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }

    },
    async loginUser(parent, args, {
        prisma
    }, info) {
        const {
            data
        } = args
        const user = await prisma.query.user({
            where: {
                email: data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login.')
        }

        const isMatch = await bcrypt.compare(data.password, user.password)

        if (!isMatch) {
            throw new Error('User/Password incorrect.')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async deleteUser(parent, args, {
        prisma,
        request
    }, info) {

        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)

    },
    async updateUser(parent, args, {
        prisma,
        request
    }, info) {
        const {
            data
        } = args

        const userId = getUserId(request)

        if (typeof data.password === 'string') {
            data.password = await hashPassword(data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data
        }, info)
    },
    async createPost(parent, args, {
        prisma,
        request
    }, info) {
        const {
            data
        } = args

        const userId = getUserId(request)

        return prisma.mutation.createPost({
            data: {
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, {
        prisma,
        request
    }, info) {
        const {
            id
        } = args

        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId
            }
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
    async updatePost(parent, args, {
        prisma,
        request
    }, info) {
        const {
            id,
            data
        } = args

        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId
            }
        })

        if (!postExists) {
            throw new Error('Unable to update post.')
        }

        const isPublished = await prisma.exists.Post({
            id,
            published: true
        })
        if (isPublished && data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id
                    }
                }
            })
        }
        return prisma.mutation.updatePost({
            where: {
                id
            },
            data
        }, info)
    },
    async createComment(parent, args, {
        prisma,
        request
    }, info) {
        const {
            data
        } = args

        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.post,
            published: true
        })

        if (!postExists) {
            throw new Error('Post not found.')
        }

        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect: {
                        id: userId
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
        prisma,
        request
    }, info) {
        const {
            id
        } = args

        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId
            }
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
        prisma,
        request
    }, info) {
        const {
            id,
            data
        } = args

        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId
            }
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
import {
    Prisma
} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

export {
    prisma as
    default
}
// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({
//         id: authorId
//     })

//     if (!userExists) {
//         throw new Error('User not found.')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published }}}')

//     return post.author
// }

// createPostForUser('cjvlie1pp00c20811rh5i6hf6', {
//     title: 'Great books to read',
//     body: 'The War of art',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((err) => {
//     console.log(err.message)
// })

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId
//     })

//     if (!postExists) {
//         throw new Error('Post not found.')
//     }

//     const post = await prisma.mutation.updatePost({
//             where: {
//                 id: postId
//             },
//             data
//         },
//         '{ author { id name email posts { id title body published } } } '
//     )

//     return post.author
// }

// updatePostForUser('654654', {
//         title: 'Should be last post',
//         body: 'I think it is'
//     })
//     .then(user => {
//         console.log(JSON.stringify(user, undefined, 2))
//     })
//     .catch(err => console.log(err.message))
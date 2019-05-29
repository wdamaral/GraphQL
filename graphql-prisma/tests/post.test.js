import '@babel/polyfill'
import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import {
    gql
} from 'apollo-boost'


import seedDatabase, {
    userOne,
    postOne,
    postTwo
} from './utils/seedDatabase'
import getClient from './utils/getClient'
import {
    getPosts,
    getMyPosts,
    updatePost,
    createPost,
    deletePost
} from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should expose all pusblished posts', async () => {
    const response = await client.query({
        query: getPosts
    })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch my posts for the authenticated user', async () => {
    const client = getClient(userOne.jwt)

    const {
        data
    } = await client.query({
        query: getMyPosts
    })

    expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    }

    const {
        data
    } = await client.mutate({
        mutation: updatePost,
        variables
    })
    const exists = await prisma.exists.Post({
        id: postOne.post.id,
        published: false
    })
    expect(data.updatePost.published).toBe(false)
    expect(exists).toBe(true)
})

test('Should create a new post', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        data: {
            title: 'Create post test',
            body: 'Create post test body',
            published: true
        }
    }

    const {
        data
    } = await client.mutate({
        mutation: createPost,
        variables
    })
    const exists = await prisma.exists.Post({
        id: data.createPost.id
    })

    expect(exists).toBe(true)
    expect(data.createPost.title).toBe('Create post test')
    expect(data.createPost.body).toBe('Create post test body')
    expect(data.createPost.published).toBe(true)
})

test('Should delete post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postTwo.post.id
    }

    await client.mutate({
        mutation: deletePost,
        variables
    })

    const exists = await prisma.exists.Post({
        id: postTwo.post.id
    })

    expect(exists).toBe(false)

})
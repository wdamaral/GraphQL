const users = [{
        id: '1',
        name: 'Wagner',
        email: 'wrdamaral@gmail.com',
        age: 32
    },
    {
        id: '2',
        name: 'Marlon',
        email: 'marlon@gmail.com',
        age: 24
    },
    {
        id: '3',
        name: 'Paty',
        email: 'Paty@gmail.com',
        age: 24
    }
]

//Demo post data
const posts = [{
        id: '1',
        title: 'First post',
        body: 'Body first post',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'Second post',
        body: 'Body second post',
        published: true,
        author: '1'
    },
    {
        id: '3',
        title: 'Third post',
        body: 'Body third post',
        published: false,
        author: '3'
    }
]

//Demo comment data
const comments = [{
        id: '1',
        text: 'Comment number 1',
        author: '1',
        post: '1'
    },
    {
        id: '2',
        text: 'Comment number 2',
        author: '1',
        post: '1'
    },
    {
        id: '3',
        text: 'Comment number 3',
        author: '2',
        post: '2'
    },
    {
        id: '4',
        text: 'Comment number 4',
        author: '3',
        post: '2'
    }
]

const db = {
    users,
    posts,
    comments
}

export {
    db as
    default
}
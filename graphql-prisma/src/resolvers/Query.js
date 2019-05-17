const Query = {
    users(parent, args, {
        db
    }, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, {
        db
    }, info) {
        if (!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            return post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                post.body.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    comments(parent, args, {
        db
    }, info) {
        return db.comments
    },
    me() {
        return {
            id: '123',
            name: 'Wagner',
            email: 'wrdamaral@gmail.com'
        }
    },
    post() {
        return {
            id: 'AnID',
            title: 'Post about GraphQL',
            body: 'This is related to graphQL',
            published: true
        }
    },
    comment() {
        return {
            id: 'TestId',
            text: 'Test text'
        }
    }

}

export {
    Query as
    default
}
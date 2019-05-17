const Query = {
    users(parent, args, {
        prisma
    }, info) {

        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, {
        prisma
    }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contais: args.query
                }]
            }
        }

        return prisma.query.posts(null, info)
    },
    comments(parent, args, {
        prisma
    }, info) {
        return prisma.query.comments(null, info)
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
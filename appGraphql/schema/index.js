import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import authentication from './authentication/index.js';
// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        authentication.typeDefs
    ]),
    resolvers: mergeResolvers([
        authentication.resolvers
    ])
})

export default schema
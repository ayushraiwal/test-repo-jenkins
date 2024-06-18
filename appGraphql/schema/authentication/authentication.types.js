import { gql } from 'apollo-server-express';
// Extend GraphQL schema with login mutation
const typeDefs = gql`
type Group {
  _id: ID!
  company_name: String!
  owner_name: String!
  email_id: String!
  pancard: String!
  adharcard: String!
  company_address: String!
  pincode: String!
  status: Boolean!
  created_by: String!
  created_at: String!
  updated_by: String
  updated_at: String
}

type User {
  _id: ID!
  email_id: String!
  username: String!
  password: String!
  full_name: String!
  mobile_number: String!
  group_id: ID!
  role: String!
  created_by: String!
  created_at: String!
  updated_by: String
  updated_at: String
}

type loginUser {
  _id: ID!
  email_id: String!
  username: String!
  full_name: String!
  mobile_number: String!
  group_id: ID!
  role: String!
  token: String!
}

type Query {
  getGroups: [Group]
  getGroup(id: ID!): Group
  getUsers: [User]
  getUser(id: ID!): User
}

type Mutation {
  createGroup(
    company_name: String!,
    owner_name: String!,
    email_id: String!,
    pancard: String!,
    adharcard: String!,
    company_address: String!,
    pincode: String!,
    status: Boolean!,
    created_by: String!
  ): Group

  updateGroup(
    _id: ID!,
    company_name: String,
    owner_name: String,
    email_id: String,
    pancard: String,
    adharcard: String,
    company_address: String,
    pincode: String,
    status: Boolean,
    updated_by: String
  ): Group

  createUser(
    email_id: String!,
    username: String!,
    password: String!,
    full_name: String!,
    mobile_number: String!,
    group_id: ID!,
    role: String!,
    created_by: String!
  ): User

  updateUser(
    _id: ID!,
    email_id: String,
    username: String,
    password: String,
    full_name: String,
    mobile_number: String,
    group_id: ID,
    role: String,
    updated_by: String
  ): User

  login(email_id: String!, password: String!): loginUser
}`

export default typeDefs;

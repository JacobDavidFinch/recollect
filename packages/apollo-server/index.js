import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';

const prisma = new PrismaClient();
const typeDefs = `
  type User {
    email: String!
    name: String
  }
  type Status {
      status: Int
      message: String
  }
  type Query {
    allUsers: [user!]!
    findUser: user
    updateUser: user
    addCard: card
    userCards: [cards!]!
    updateCard: card
    deleteCard: Status
  }
  type Mutation {
      updateUser(user: User!): User
      addCard(card: Card!): Card 
      updateCard(card: Card!): Card
      deleteCard(card: Card!): Card
  }
`;
const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    findUser: () => {
        return prisma.user.findUnqiue();
    },
    userCards: (userId) => {
        return prisma.card.findMany({where: {userId}})
    },
    // addTag, removeTag
  },
  Mutation: {
    updateUser: (_parent, args: {user}, context) => {
        return prisma.user.update({data: user, where: {userId: user.userId}})
    },
    updateCard: (_parent, args: {card}, context) => {
        return prisma.card.update({data: card, where: {id: cardId}})
    },
    deleteCard: async (_parent, args: {card}, context) => {
        const result = await prisma.card.update({data: {...card, deletedAt: new Date()}, where: {id: cardId}})
        return 
    },
    addCard: (_parent, args: {card}, context) => {
        return prisma.card.create({data: card})
    },
    addProfileForUser: (_parent, args: { userUniqueInput: UserUniqueInput, bio: string }, context: Context) => {
          return context.prisma.profile.create({
            data: {
              bio: args.bio,
              user: {
                connect: {
                  id: args.userUniqueInput?.id,
                  email: args.userUniqueInput?.email
                }
              }
            }
          })
    },
  }
};
const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 });
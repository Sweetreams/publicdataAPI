import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class User {
    prisma = prisma

    getUser(login) {
        return this.prisma.user.findMany({
            where: {
                login: login,
            }
        })
    }

    getIdUser(id) {
        return this.prisma.user.findMany({
            where: { id: Number(id) }
        })
    }

    getUserLogin(login) {
        return this.prisma.user.findMany({
            where: {
                login: login,
            }
        })
    }

    editingUser(id, dataed){
        return this.prisma.user.update({
            where: {id: Number(id)},
            data: {
                ...dataed
            }
        })
    }

    createUser(user) {
        return this.prisma.user.create({
            data: user
        })
    }

    deleteUser(id) {
        return this.prisma.user.deleteUser({
            where: {
                id: Number(id)
            }
        })
    }
}
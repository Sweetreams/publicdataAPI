import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class SetData {
    prisma = prisma

    getSet() {
        return this.prisma.setDB.findMany()
    }

    getDataSetID(id){
        return this.prisma.dataSet.findMany({
            where: {
                id_set: Number(id)
            }
        })
    }
}
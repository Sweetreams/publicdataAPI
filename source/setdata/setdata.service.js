import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class SetData {
    prisma = prisma

    getSet() {
        return this.prisma.setDB.findMany()
    }

    getDataSet() {
        return this.prisma.dataSet.findMany()
    }

    getDataSetID(id) {
        return this.prisma.dataSet.findMany({
            where: {
                id_set: Number(id)
            }
        })
    }

    createSet(dataset) {
        return this.prisma.setDB.create({
            data: {
                data: dataset
            }
        })
    }

    createDataSet(dataset, id) {
        return this.prisma.setDB.create({
            data: {
                id_set: id,
                data: dataset
            }
        })
    }

    deleteDataSetID(id) {
        return this.prisma.dataSet.deleteMany({
            where: {
                id_set: Number(id)
            }
        })
    }
}
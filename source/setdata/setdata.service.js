import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class SetData {
    prisma = prisma
    //Получение данных
    getSet() {
        return this.prisma.setDB.findMany()
    }

    getDataSet() {
        return this.prisma.dataSet.findMany()
    }

    getDataSetID(id) {
        return this.prisma.dataSet.findMany({
            where: {
                setdb: {
                    id: Number(id)
                }
            }
        })
    }
    //Создание данных
    createSet(dataset) {
        return this.prisma.setDB.create({
            data: {
                data: dataset
            }
        })
    }

    createDataSet(dataset, id) {
        return this.prisma.dataSet.create({
            data: {
                data: dataset,
                setdb: {
                    connect: {
                        id: id
                    }
                }
            },

        })
    }
    //Изменение данных

    //Удаление данных
    deleteDataSetID(id) {
        return this.prisma.dataSet.deleteMany({
            where: {
                id: Number(id)
            }
        })
    }
}
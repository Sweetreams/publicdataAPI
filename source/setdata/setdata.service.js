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

        return this.prisma.$transaction(async (prisma) => {

            const createdSet = await prisma.setDB.create({
                data: {
                    data: dataset
                }
            });
    
            const updatedSet = await prisma.setDB.update({
                where: {
                    id: createdSet.id
                },
                data: {
                    data: {
                        ...createdSet.data,
                        key: createdSet.id
                    }
                }
            });
    
            return updatedSet;
        });
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

    createSetAndDataSet(dataset){
        this.prisma.$transaction(async (prisma) => {

            const createdSet = await prisma.setDB.create({
                data: {
                    data: dataset.set
                }
            });
    
            const updatedSet = await prisma.setDB.update({
                where: {
                    id: createdSet.id
                },
                data: {
                    data: {
                        ...createdSet.data,
                        key: createdSet.id
                    }
                }
            });

            const createDataSet = await prisma.dataSet.create({
                data: {
                    data: dataset.data,
                    setdb: {
                        connect: {
                            id: updatedSet.id
                        }
                    }
                },
    
            })
            return createDataSet
        });
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
    deleteSetID(id) {
        return this.prisma.setDB.deleteMany({
            where: {
                id: Number(id)
            }
        })
    }
}
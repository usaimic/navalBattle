import { PrismaClient } from "generated/prisma/client";

const prisma = new PrismaClient()

// export async function searchUserById(seaerchId: number){
//     const query = await prisma.users.findMany({
//         where: {
//             id: seaerchId, 
//         }
//     })

//     console.log(query)
// }

// searchUserById(0)
//     .then(async() => {
//         await prisma.$disconnect()
//     })
//     .catch(async(e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

export async function findByNameSurname(name: string, surname: string){
    const query = await prisma.users.findMany({
        where: {
            name: name,
            surname: surname
        },
    });

    console.log(query);
}

findByNameSurname('Michael', 'Usai')
    .then(async() => {
        await prisma.$disconnect
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect
        process.exit(1)
    })
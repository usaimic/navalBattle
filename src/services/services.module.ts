import { Module, Provider } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

export const services: Provider[] = [
    PrismaService,
    { provide: 'MANUAL_PRISMA', useClass: PrismaService }
]

@Module({
    providers: [...services],
    exports: [...services]
})

export class ServicesModule {}
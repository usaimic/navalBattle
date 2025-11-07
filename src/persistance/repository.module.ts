import { Module } from "@nestjs/common";
import { ServicesModule } from "src/services/services.module";
import { ActionRepository } from "./action/actionRepository";
import { FieldRepository } from "./field/fieldRepository";
import { HistoryRepository } from "./history/historyRepository";
import { LobbyRepository } from "./lobby/lobbyRepository";
import { ShipChildRepository } from "./ship/shipChild/shipChildRepository";
import { ShipParentRepository } from "./ship/shipParent/shipParentRepository";
import { UserRepository } from "./user/userRepository";

export const repository = [
    ActionRepository,
    FieldRepository,
    HistoryRepository,
    LobbyRepository,
    ShipChildRepository,
    ShipParentRepository,
    UserRepository
]

@Module({
    imports: [ServicesModule],
    providers: [...repository],
    exports: [...repository]
})

export class RepositoryModule{}
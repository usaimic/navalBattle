import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UsersController } from "./users/users.controller";
import { ShipParentController } from "./ship/shipParent/shipParent.controller";
import { ShipChildController } from "./ship/shipChild/shipChild.controller";
import { LobbyController } from "./lobby/lobby.controller";
import { HistoryController } from "./history/history.controller";
import { FieldController } from "./field/field.controller";
import { ActionController } from "./action/action.controller";

export const controllers = [
    ActionController,
    FieldController,
    HistoryController,
    LobbyController,
    ShipChildController,
    ShipParentController,
    UsersController
]


@Module({
    imports: [DomainModule],
    controllers: [...controllers],
})

export class ControllerModule{}
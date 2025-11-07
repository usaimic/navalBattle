import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/persistance/repository.module";
import { ActionCreateService } from "./action/useCase/actionCreate";
import { ActionFindByIdService } from "./action/useCase/actionFindById";
import { ActionFindByLobbyIdPlayerIdService } from "./action/useCase/actionFindByLobbyIdPlayerId";
import { ActionRemoveByLobbyIdService } from "./action/useCase/actionRemoveByLobbyId";
import { ActionUndoService } from "./action/useCase/actionUndo";
import { FieldGetFinalViewService } from "./field/useCase/fieldGetFinalView";
import { FieldGetHitService } from "./field/useCase/fieldGetHit";
import { FieldGetPlacedService } from "./field/useCase/fieldGetPlaced";
import { FieldHitResponseService } from "./field/useCase/fieldHitResponse";
import { HistoryFindByUserIdService } from "./history/useCase/historyFindByUserId";
import { HistoryUpdateByIdService } from "./history/useCase/historyUpdateById";
import { LobbyCreateService } from "./lobby/useCase/lobbyCreate";
import { LobbyEndGameService } from "./lobby/useCase/lobbyEndGame";
import { LobbyFindByIdService } from "./lobby/useCase/lobbyFindById";
import { LobbyFindByPlayerIdService } from "./lobby/useCase/lobbyFindByPlayerId";
import { LobbyFindByWinnerIdService } from "./lobby/useCase/lobbyFindByWinnerId";
import { LobbyGetOpponentIdService } from "./lobby/useCase/lobbyGetOpponentId";
import { LobbyJoinByIdService } from "./lobby/useCase/lobbyJoinById";
import { LobbyJoinByRandomService } from "./lobby/useCase/lobbyJoinByRandom";
import { LobbySetPrivacyByIdService } from "./lobby/useCase/lobbySetPrivacyById";
import { LobbySetReadyByLobbyIdUserIdService } from "./lobby/useCase/lobbySetReadyByLobbyIdUserId";
import { LobbySetWinnerByIdService } from "./lobby/useCase/lobbySetWinnerById";
import { LobbyUpdateTurnByIdService } from "./lobby/useCase/lobbyUpdateTurnById";
import { UserCreateService } from "./user/useCase/userCreate";
import { UserFindAllService } from "./user/useCase/userFindAll";
import { UserFindAllOrderByService } from "./user/useCase/userFindAllOrderBy";
import { UserFindByIdService } from "./user/useCase/userFindById";
import { UserFindByKeywordService } from "./user/useCase/userFindByKeyword";
import { UserUpdateService } from "./user/useCase/userUpdate";
import { ShipParentChildHittedService } from "./ship/shipParent/useCase/shipParentChildHitted";
import { ShipParentCreateService } from "./ship/shipParent/useCase/shipParentCreate";
import { ShipParentFindByIdService } from "./ship/shipParent/useCase/shipParentFindById";
import { ShipParentFindByLobbyIdPlayerIdService } from "./ship/shipParent/useCase/shipParentFindByLobbyIdPlayerId";
import { ShipParentPlaceByIdService } from "./ship/shipParent/useCase/shipParentPlaceById";
import { ShipParentRemoveByIdService } from "./ship/shipParent/useCase/shipParentRemoveById";
import { ShipParentSetStatusByIdService } from "./ship/shipParent/useCase/shipParentSetStatusById";
import { ShipChildCreateService } from "./ship/shipChild/useCase/shipChildCreate";
import { ShipChildFindByIdService } from "./ship/shipChild/useCase/shipChildFindById";
import { ShipChildFindByParentIdService } from "./ship/shipChild/useCase/shipChildFindByParentId";
import { ShipChildHittedService } from "./ship/shipChild/useCase/shipChildHitted";
import { ShipChildPlaceService } from "./ship/shipChild/useCase/shipChildPlace";
import { ShipChildRemoveByParentIdService } from "./ship/shipChild/useCase/shipChildRemoveByParentId";
import { ShipChildSetStatusByIdService } from "./ship/shipChild/useCase/shipChildSetStatusById";
import { ShipChildSetXYService } from "./ship/shipChild/useCase/shipChildSetXY";
import { ShipParentRemoveByLobbyIdService } from "./ship/shipParent/useCase/shipParentRemoveByLobbyId";

const useCases = [
    //Action useCases
    ActionCreateService,
    ActionFindByIdService,
    ActionFindByLobbyIdPlayerIdService,
    ActionRemoveByLobbyIdService,
    ActionUndoService,

    //Field useCases,
    FieldGetFinalViewService,
    FieldGetHitService,
    FieldGetPlacedService,
    FieldHitResponseService,

    //History useCases
    HistoryFindByUserIdService,
    HistoryUpdateByIdService,

    //Lobby useCases
    LobbyCreateService,
    LobbyEndGameService,
    LobbyFindByIdService,
    LobbyFindByPlayerIdService,
    LobbyFindByWinnerIdService,
    LobbyGetOpponentIdService,
    LobbyJoinByIdService,
    LobbyJoinByRandomService,
    LobbySetPrivacyByIdService,
    LobbySetReadyByLobbyIdUserIdService,
    LobbySetWinnerByIdService,
    LobbyUpdateTurnByIdService,

    //ShipChild useCases
    ShipChildCreateService,
    ShipChildFindByIdService,
    ShipChildFindByParentIdService,
    ShipChildHittedService,
    ShipChildPlaceService,
    ShipChildRemoveByParentIdService,
    ShipChildSetStatusByIdService,
    ShipChildSetXYService,

    //ShipParent useCases
    ShipParentChildHittedService,
    ShipParentCreateService,
    ShipParentFindByIdService,
    ShipParentFindByLobbyIdPlayerIdService,
    ShipParentPlaceByIdService,
    ShipParentRemoveByIdService,
    ShipParentSetStatusByIdService,
    ShipParentRemoveByLobbyIdService,

    //User useCases
    UserCreateService,
    UserFindAllService,
    UserFindAllOrderByService,
    UserFindByIdService,
    UserFindByKeywordService,
    UserUpdateService
]

@Module({
    imports: [RepositoryModule],
    providers: [...useCases],
    exports: [...useCases]
})

export class DomainModule{}
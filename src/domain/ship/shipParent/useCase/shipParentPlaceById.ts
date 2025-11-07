import { Injectable } from "@nestjs/common";
import { ShipParentRepository } from "src/persistance/ship/shipParent/shipParentRepository";
import { ShipChild, shipChildCoordinates, ShipParent } from "../../Ship";
import { ShipParentFindByIdService } from "./shipParentFindById";
import { Field } from "src/domain/field/Field";
import { enumShipStatus } from "src/persistance/ship/shipUtilities";
import { FieldGetPlacedService } from "src/domain/field/useCase/fieldGetPlaced";
import { ShipChildFindByParentIdService } from "../../shipChild/useCase/shipChildFindByParentId";
import { ShipChildPlaceService } from "../../shipChild/useCase/shipChildPlace";

@Injectable()
export class ShipParentPlaceByIdService{
    constructor(
        private shipParentRepository: ShipParentRepository,
        private shipParentFindByIdService: ShipParentFindByIdService,
        private fieldGetPlacedService: FieldGetPlacedService,
        private shipChildFindByParentIdService: ShipChildFindByParentIdService,
        private shipChildPlaceService: ShipChildPlaceService,
    ){}

    async run(playerId: number, parentId: number, coordinates: shipChildCoordinates[]): Promise<boolean>{        
        const placeble: boolean = await this.check(playerId, parentId, coordinates);
        if(placeble){
            const ship: ShipParent | null = await this.shipParentRepository.setStatusById(parentId, enumShipStatus("placed"))
            if(ship){
                this.placeChild(playerId, ship.lobbyId, ship.id, coordinates);
                return true;
            }
        }
        return false;
    }

    async placeChild(playerId: number, lobbyId: number, parentId: number, coordinates: shipChildCoordinates[]): Promise<void>{
        const childs: ShipChild[] | null = await this.shipChildFindByParentIdService.run(parentId);
        if(!childs || childs.length !== coordinates.length) return;

        for(const [index, child] of childs.entries()){
            const update: ShipChild | null = await this.shipChildPlaceService.run(playerId, lobbyId, child.id, 'placed', coordinates[index].x, coordinates[index].y);
        };
    }

    async check(playerId: number, parentId: number, coordinates: shipChildCoordinates[]): Promise<boolean>{
        const parentShip: ShipParent | null = await this.shipParentFindByIdService.run(parentId);
        if(parentShip){ 
                const dimensionCheck: boolean = await this.dimensionCheck(parentShip, coordinates.length); 
                const coordinatesCheck: boolean = this.coordinatesCheck(coordinates);
                const fieldCheck: boolean = await this.fieldCheck(playerId, parentShip.lobbyId, coordinates);
                const otherShipsCheck: boolean = await this.otherShipsCheck(playerId, parentShip.lobbyId, coordinates);
                return (dimensionCheck && coordinatesCheck && fieldCheck && otherShipsCheck)
        }
        return false;
    }

    async dimensionCheck(parentShip: ShipParent , childQuantity: number): Promise<boolean>{
        if(parentShip){
            const parentDimension: number = parentShip.dimension;
            return (parentDimension == childQuantity)
        }
        return false;
    }

    coordinatesCheck(coordinates: shipChildCoordinates[]): boolean{
        for(const c of coordinates){
            if(c.x > 10 || c.y > 10){
                console.log("Sono state passate delle coordinate fuori dal campo")
                return false;
            }
        }
        return true;
    }
    
    async fieldCheck(playerId: number, lobbyId: number, coordinates: shipChildCoordinates[]): Promise<boolean>{
        const defensiveField: Field = await this.fieldGetPlacedService.run(lobbyId, playerId);
        for(const c of coordinates){
            if(defensiveField[c.x][c.y].status != 'free'){
                console.log("Si sta cercando di piazzare una nave su una (o più) caselle occupate")
                return false;
            }
        }
        return true;
    }

    async otherShipsCheck(playerId: number, lobbyId: number, coordinates: shipChildCoordinates[]): Promise<boolean>{
        const defensiveField: Field = await this.fieldGetPlacedService.run(lobbyId, playerId);
        for(const c of coordinates){
            if(
                (defensiveField[c.x + 1][c.y].status != 'free') ||
                (defensiveField[c.x - 1][c.y].status != 'free') ||
                (defensiveField[c.x][c.y + 1].status != 'free') ||  
                (defensiveField[c.x][c.y - 1].status != 'free') || 
                (defensiveField[c.x + 1][c.y + 1].status != 'free') ||  
                (defensiveField[c.x + 1][c.y - 1].status != 'free') || 
                (defensiveField[c.x - 1][c.y + 1].status != 'free') || 
                (defensiveField[c.x - 1][c.y - 1].status != 'free')){
                    console.log("Si sta cercando di piazzare una nave in modo adiacente ad un'altra nave");
                    return false;
                }
        }
        return true;
    }
}
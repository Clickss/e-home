import { ObjetPiece } from "./objetpiece";
import { Ambiance } from "./ambiance";

export class Piece {
    id: string;
    nom: string;
    ambiances: Ambiance[];
    objetpiece: ObjetPiece[];

    constructor(id?: string, nom?: string){

    }
}
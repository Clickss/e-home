import { Slider } from "./slider";
import { Etat } from "./etat";
import { ObjetPiece } from "./objetpiece";

export class Parametre {
    id: string;
    heure: string;
    jour: string;
    objet_piece: ObjetPiece;
    val_etat: string;
    val_slider: string;

    constructor(id?: string){

    }
}
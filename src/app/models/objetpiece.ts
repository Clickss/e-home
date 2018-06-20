import { Objet } from "./objet";
import { ValeursObjet } from "./valeursobjet";
import { Parametre } from "./parametre";

export class ObjetPiece {
    id: string;
    objet: Objet;
    valeurs_objet: ValeursObjet;
    programmations: Parametre;

    constructor(id?: string, objet?: Objet){

    }
}
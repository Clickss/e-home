import { AttributObjet } from "./attributobjet";

export class Objet {
    id: string;
    nom: string;
    image: string;
    image_on: string;
    image_off: string;
    image_min: string;
    image_med: string;
    image_max: string;
    attribut_objet: AttributObjet;
    

    constructor(id?: string, nom?: string, image?: string, image_on?: string, image_off?: string, image_min?: string, image_med?: string, image_max?: string){

    }
}
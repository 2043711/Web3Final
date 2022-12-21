import { Site } from './site';

export interface Ville {
    _id: string | null;
    nom: string;
    population: number;
    codePostal: string[];
    superficie: number;
    longitude: number;
    latitude: number;
    altitude: number;
    region: string;
    densite: number;
    dateCreation: number;
    fondateur: string;
    SiteTouristique: Site[];
    conservateurAuPouvoir: boolean;
    token: string;
    fondation: string | null;
    fondationEN: string | null;
    position: string | null;
}

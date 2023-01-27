export interface Tache {
    _id?: string,
    titre: string,
    status: string,
    termine: boolean
}


export interface ListeTaches {
    ListeT: string;
    TacheT: string;
    taches : Array<Tache>;
}
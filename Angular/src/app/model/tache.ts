export interface Tache {
    _id?: string,
    titre: string,
    status: string,
    termine: boolean
}
export interface ListeTaches {
    titreListe: string;
    titreTache: string;
    taches : Array<Tache>;
}
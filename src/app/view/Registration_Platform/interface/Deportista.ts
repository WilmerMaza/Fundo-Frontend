export interface Deportista {
    Name?: string
    LastName?: string
    Birthdate?: string
    IwfCoiCode?: string
    Numero_Sorteo?: string
    Primer_Arranque?: string
    Primer_Envion?: string
    Id_Partida?: string
}



export interface ResponseDeportistaList {
    Id: string
    Id_Partida: string
    Name: string
    LastName?: string
    Numero_Sorteo: number
    Birthdate: string
    IwfCoiCode: string
    Primer_Envion: number
    Primer_Arranque: number
    createdAt?: string
    updatedAt?: string
    evaluarNumber?: number

    intento?: number
    totalArranque?: number;
    totalATiempo?: string;
    lugarArranque?: number | string;
    totalEnvion?: number;
    totalETiempo?: string
    tiempo?: string;
    tipoCompeticion?: string;
    firstArranque?: number
    firstArranqueValid?: string
    secondArranque?: number
    secondArranqueValid?: string
    thirdArranque?: number
    thirdArranqueValid?: string

    firstEnvion?: number
    firstEnvionValid?: string
    secondEnvion?: number
    secondEnvionValid?: string
    thirdEnvion?: number
    thirdEnvionValid?: string
    lugarEnvion?: number | string;

    total?: number | string
    lugar?: number | string;

}

export interface ResponseDeportista {
    message: string
    athlete: Athlete
}

export interface Athlete {
    Id: string
    Name: string
    LastName: string
    Birthdate: string
    IwfCoiCode: string
    Numero_Sorteo: number
    Primer_Arranque: number
    Primer_Envion: number
    Id_Partida: string
    updatedAt: string
    createdAt: string
}

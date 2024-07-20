export interface IntentosPartida {
    _id: string
    deportista_id: string
    fecha: string
    tipo: string
    intentos: Intento[]
    Id_Partida: string
    __v: number
}

export interface Intento {
    numero: number
    peso: number
    resultado: string
    _id: string
    tiempo?:string
}

export interface Peso {
    $numberDecimal: string
}

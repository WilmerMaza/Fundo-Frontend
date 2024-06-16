export interface DataDeportista {
  action: string
  time: string
  body: Athlete
}

export interface Athlete {
  Name: string
  LastName: string
  Numero_Sorteo: number
  IwfCoiCode: string
  Primer_Envion: number
  Primer_Arranque: number
}


export interface cronometro {
  timestamp: any;
}

export interface requestSuccefull {
  message: string;
}

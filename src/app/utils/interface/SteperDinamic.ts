import { Value } from "src/app/utils/interface/value"

export interface SteperDinamic {
    error: string
    label: string
    controle?: Controle[]
    action?: any
    message?: string
}

export interface Controle {
    label: string
    placeholder: string
    controlName: string
    validators: any
    type: string
    list?: Value[]
    suffix?: string
}

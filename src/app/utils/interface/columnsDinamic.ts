export interface columnsDinamic {
    displayname: string
    name: string
    estado: boolean
    colspan?: number
    children?: columnsDinamic[]
    type: string
    custom?:boolean
}

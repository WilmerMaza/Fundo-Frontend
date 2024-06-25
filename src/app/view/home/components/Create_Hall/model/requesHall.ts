
export interface RequestHall {
    RegistrationPlatform: RegistrationPlatform
    mobile: Mobile[]
    chronometer: Chronometer
}

export interface RegistrationPlatform {
    document: string
    name: string
}

export interface Mobile {
    document: string
    name: string
}

export interface Chronometer {
    document: string
    name: string
}

import { DefaulPlatform } from "../view/login/model/defaulPlatform"

export const platform: string[] = ['Registration_Platform', 'mobile', 'chronometer']

export const platformSelectForm: DefaulPlatform[] = [
    { value: 'Registration_Platform', platform: 'registration' },
    { value: 'mobile', platform: 'mobile' },
    { value: 'chronometer', platform: 'chronometer' }]

export const chronometer: string = 'chronometer'
export const Registration_Platform: string = 'Registration_Platform'
export const mobile: string = 'mobile'
export const dashboard: string = 'dashboard'

export const chronometerList: DefaulPlatform[] = [
    { value: 'Public', platform: 'Publica' },
    { value: 'Arbitrator', platform: 'Arbitros' }]
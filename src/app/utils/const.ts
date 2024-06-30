import { DefaulPlatform } from "../view/login/model/DefaulPlatform"

export const platform: string[] = ['RegistrationPlatform', 'mobile', 'chronometer']

export const platformSelectForm: DefaulPlatform[] = [
    { value: 'RegistrationPlatform', platform: 'registration' },
    { value: 'mobile', platform: 'mobile' },
    { value: 'chronometer', platform: 'chronometer' }]

export const chronometer: string = 'chronometer'
export const RegistrationPlatform: string = 'RegistrationPlatform'
export const mobile: string = 'mobile'
export const dashboard: string = 'dashboard'

export const chronometerList: DefaulPlatform[] = [
    { value: 'Public', platform: 'Publica' },
    { value: 'Arbitrator', platform: 'Arbitros' }]

export const arbitrator: any[] = [
    { content: 1, class: 'ArbitratorFirst' },
    { content: 2, class: 'ArbitratorSecond' },
    { content: 3, class: 'ArbitratorThird' }]
export interface DefaulPlatform {
    value: string, platform: string
}

export interface RequestSuccessfull {
    message: string
    token: string
  }

  export interface RequestLogin {
    hall: string
    platform: string
    documento: string
  }
export interface IConfig {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    PORT: number,
    dialect: any,
    pool: any,
    token : any
}
export interface devicevaluepass {
    time:string,
    device:string,
    consumption:number
}

export interface Customervaluepass {
    PHONE_NO:string,
    PASSWORD:string,
    DEVICE:string
}
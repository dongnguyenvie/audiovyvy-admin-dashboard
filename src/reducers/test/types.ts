export enum ActionTypeKeys {
    GET_COUNT = 'GET_COUNT',
    SET_COUNT = 'SET_COUNT'
}

export interface ICount {
    count: number
}

export interface IGetCount {
    type: ActionTypeKeys.GET_COUNT,
    payload?: ICount
} 

export interface ISetCount {
    type: ActionTypeKeys.SET_COUNT,
    payload?: ICount
}

export type IActionTypes = IGetCount | ISetCount
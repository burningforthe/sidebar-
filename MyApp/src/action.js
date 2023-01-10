import {INCREASE_Book,DECREASE_Book} from './actiontype';

export const increaeBookAction=(parameter)=>{
    return{
        type:INCREASE_Book,
        payload:parameter
    }
}

export const decereaseBookAction=()=>{
    return{
        type:DECREASE_Book,
    }
}
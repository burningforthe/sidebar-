import { INCREMENT_TIME } from "../../config/constants"

const initState = {
    historyData: {},
    history: {},
    historyFilter: 10,
    sourceHistory: {},
    sourceId: 'cTQ3Ko9ZKg8',
    sourceTimeStamp: 0,
    historyList: [],
    messageList: [
        "So, we'll try to guess:\
        \n\nWhat intrigues you. What kind of energy you like? \
        \n\nYour interest areas etc etc..  to the extent viable \
        \n\nAnd, most importantly enable you to go deep.\
        \n\nLet's go. Click lambda: λ"
    ],
    messageIndex: -1,
    message: "Hi Annonyomous user.\
        \n\nA fan of your poems :)\
        \n\nElse is an attempt to enable better discovery, of all amazing things. Including yourself.\
        \n\nWe, the curated algorithms, would love to get into a transparent conversation to help you figure out the world, and yourself.\
        \n\nLet's dance."
}

export default function reducer(state = initState, action){
    switch (action.type){
        case 'SET_SOURCE': {
            return {
                ...state,
                sourceId: action.payload,
                sourceTimeStamp: state.sourceHistory[action.payload] ?? 0.1
            }
        }

        case 'INCREMENT_HISTORY':{
            const id = action.payload
            const incrementHistory = {}
            incrementHistory[id] = (state.history[id] ?? 0) + INCREMENT_TIME
            return {
                ...state,
                history: {...state.history, ...incrementHistory }
            }
        }

        case 'UPDATE_HISTORY':{
            const id = action.payload.id 
            const incrementHistory = {}
            incrementHistory[id] = (state.history[id] ?? 0) + (action.payload.time ?? 0)*1000
            const setSourceHistory = {}
            setSourceHistory[id] =  action.payload.timeStamp.toFixed() ?? 0
            return {
                ...state,           
                history: { ...state.history, ...incrementHistory },
                sourceHistory:  { ...state.sourceHistory, ...setSourceHistory }
            }
        }

        case 'UPDATE_HISTORY_DATA':
            return {
                ...state,
                historyData: { ...state.historyData, ...action.payload }
            }

        case 'UPDATE_HISTORY_LIST':{
            const historyKeyList = Object.keys(state.history)
            let historyList = historyKeyList.reverse().map((item, index) => 
                (
                    {
                        id: item, 
                        thumbnail: `https://i.ytimg.com/vi/${item}/mqdefault.jpg`, 
                        time: `${state.history[item]}`
                    }
                )
            )
            historyList = historyList.filter((item, index) => item.time > state.historyFilter)
                
            return {
                ...state,
                historyList: historyList
            }
        }

        case 'NEXT_MESSAGE':{
                const newIndex = Math.min((state.messageIndex + 1), state.messageList.length-1)
                return {
                    ...state,
                    messageIndex: newIndex,
                    message:state.messageList[newIndex]
                }
            }

        case 'FLUSH_PROFILE': 
            return initState;

        default:
            return state;
    }
}
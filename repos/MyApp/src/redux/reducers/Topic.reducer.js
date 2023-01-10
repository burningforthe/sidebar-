const initState = {
    loading: true, 
    data: [], 
    stories: [],
    topic_data: [],
    token: null,
    reset_detail: ""
}

export default function reducer(state = initState, action){
    switch (action.type){
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'FETCH':{
            // console.log(action.type)
            return {
                data: action.payload.data ?? [],
                stories:action.payload.stories ?? [],
                loading: false
            }
        }
        case 'LOADED':{
            // console.log(action.type)
            return {
                ...state,
                loading: false
            }
        }
        case 'RESET_STORY': 
            return {
                ...state,
                data: [], 
                stories: [],
                loading: true
            }

        case 'FLUSH_STORY': 
            return initState;

        case 'TOPIC_DATA': {
            return {
                ...state,
                topic_data: action.payload
            }
        }

        case 'SAVE_AUTH_TOKEN':
            return {
                ...state,
                token: action.payload
            }

        case 'RESET_DETAIL':
            return {
                ...state,
                reset_detail: action.payload
            }

        case 'UPDATE_TOPIC_DATA': 
            return {
                ...state,
                topic_data: action.payload
            }
        

        case 'LOGOUT': 
            return initState

        default:
            return state;
    }
}
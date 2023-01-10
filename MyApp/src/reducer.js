import {INCREASE_Book , DECREASE_Book} from './actiontype';

//initializing satate:
const intialState={
    numberofBooks: 20
}

const bookReducer = (state=intialState, action) => {
  switch(action.type){
      case INCREASE_Book:return{
          ...state,
          numberofBooks:state.numberofBooks+action.payload
      }
      case DECREASE_Book:return{
          ...state,
          numberofBooks:state.numberofBooks-1
      }
      default:return state
  }
}

export default bookReducer;

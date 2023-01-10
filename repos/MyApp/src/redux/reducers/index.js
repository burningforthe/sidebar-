import { combineReducers } from 'redux'
import topic from './Topic.reducer'
import task from './Task.reducer'

export default combineReducers({
    task,
    topic
})
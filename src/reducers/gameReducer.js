import {
    RESET,
    GAME_OVER,
    UPDATE_TAIL,
    UPDATE_HEAD,
    CREATE_APPLE,
    INITIAL_STATE,
    UPDATE_VELOCITY
} from '../actions/types'

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case RESET:
            return {...action.payload.state}
        case GAME_OVER:
            return {...state, gameOver: action.payload.flag}
        case CREATE_APPLE:
            return {...state, apple: action.payload.newApple}
        case UPDATE_HEAD:
            return {...state, snake: {...state.snake, head: action.payload.newHead}}
        case UPDATE_TAIL:
            return {...state, snake: {...state.snake, tail: action.payload.newTail}}
        case UPDATE_VELOCITY:
            return {...state, snake: {...state.snake, velocity: action.payload.newVelocity}}
        default:
            return state
    }
}
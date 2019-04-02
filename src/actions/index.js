
import {
    UPDATE_HEAD,
    UPDATE_TAIL,
    UPDATE_VELOCITY,
    CREATE_APPLE,
    RESET,
    GAME_OVER
} from './types'

export const reset = (state) => {
    return({
        type: RESET,
        payload: state
    })
}

export const setGameOver = (flag) => {
    return({
        type: GAME_OVER,
        payload: flag

    })
}

export const createApple = (apple) =>{
    return({
        type: CREATE_APPLE,
        payload: apple
    })
}
export const updateSnakeHead = (head) =>{
    return({
        type: UPDATE_HEAD,
        payload: head
    })
}
export const updateSnakeTail = (tail) =>{
    return({
        type: UPDATE_TAIL,
        payload: tail
    })
}
export const updateSnakeVelocity = (velocity) =>{
    return({
        type: UPDATE_VELOCITY,
        payload: velocity
    })
}


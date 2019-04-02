import { createGrid } from '../helpers'

export const RESET = 'RESET'
export const CREATE_APPLE = 'CREATE_APPLE'
export const UPDATE_HEAD = 'UPDATE_HEAD'
export const UPDATE_TAIL = 'UPDATE_TAIL'
export const UPDATE_VELOCITY = 'UPDATE_VELOCITY'
export const GAME_OVER = 'GAME_OVER'

export const KEY_LEFT = 37
export const KEY_UP = 38
export const KEY_RIGHT = 39
export const KEY_DOWN = 40
export const KEY_ENTER = 13

// change size to make grid big or small
export const GRID_SIZE = 20
export const GAME_SPEED = 100

export const UP = {
    x: 0,
    y: -1,
}
export const DOWN = {
    x: 0,
    y: 1,
}
export const LEFT = {
    x: -1,
    y: 0,
}
export const RIGHT = {
    x: 1,
    y: 0,
}

export const INITIAL_STATE = {
    grid: createGrid(GRID_SIZE),
    apple: {
        row: Math.floor(Math.random() * GRID_SIZE),
        col: Math.floor(Math.random() * GRID_SIZE),
    },
    snake: {
        head: {
            row: 9,
            col: 9
        },
        velocity: {
            x: 1,
            y: 0
        },
        tail: [
            {
                row: 9,
                col: 8
            },            
            {
                row: 9,
                col: 7
            }
        ],
    },
    
    gameOver: false
}
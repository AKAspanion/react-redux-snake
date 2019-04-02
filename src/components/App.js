import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    reset, 
    setGameOver,
    createApple,
    updateSnakeTail, 
    updateSnakeHead, 
    updateSnakeVelocity} from '../actions'
import {
    GAME_SPEED,
    INITIAL_STATE,
    UP, DOWN, LEFT, RIGHT, 
    KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP} from '../actions/types';

import './style.css'

class App extends Component {

    componentDidMount = () =>{     
        this.start()
    }

    start = () =>{
        this.props.reset({
            state: INITIAL_STATE
        })
        document.addEventListener('keydown', (e) => {
            this.moveSnake(e)
        });
        setTimeout(() => {
            this.gameLoop()
        }, GAME_SPEED)
    }

    gameLoop = () =>{
        //if game is over exit game loop
        if (this.props.gameOver) 
            return;
        
        //extracting data from props to change state
        const {snake, apple} = this.props

        // updating head
        const newHead = {
            row: snake.head.row + snake.velocity.y,
            col: snake.head.col + snake.velocity.x
        }
        this.props.updateSnakeHead({
            newHead
        })
        
        // updating apple and tail
        let newTail = [snake.head, ...snake.tail]
        let newApple = apple
        const isEat = this.snakeEatsApple()

        if(isEat){
            newApple = this.getRandomApple()
            this.props.createApple({
                newApple
            })
        }else{
            newTail.pop()
        }        
        this.props.updateSnakeTail({
            newTail
        })

        //move over condition
        this.moveOnEdge()
        
        //game over condition
        if(this.isTail(this.props.snake.head)){
            this.props.setGameOver({
                flag: true
            })
        }

        //restart loop after defined time
        setTimeout(() => {
            this.gameLoop()
        }, GAME_SPEED)
    }

    moveOnEdge = () =>{
        const {snake} = this.props
        if(this.isOffEdge(snake.head)){
            if(snake.head.col>19){
                const newHead = {
                    row: snake.head.row + snake.velocity.y,
                    col: -1 + snake.velocity.x
                }                
                this.props.updateSnakeHead({
                    newHead
                })
            }
            else if(snake.head.col<0){
                const newHead = {
                    row: snake.head.row + snake.velocity.y,
                    col: 20 + snake.velocity.x
                }                
                this.props.updateSnakeHead({
                    newHead
                })
            }
            else if(snake.head.row<0){
                const newHead = {
                    row: 20 + snake.velocity.y,
                    col: snake.head.col + snake.velocity.x
                }                
                this.props.updateSnakeHead({
                    newHead
                })
            }else if(snake.head.row>19){
                const newHead = {
                    row: -1 + snake.velocity.y,
                    col: snake.head.col + snake.velocity.x
                }                
                this.props.updateSnakeHead({
                    newHead
                })
            }
        }
    }

    getRandomApple = () =>{
        const { grid } = this.props;
        const emptyCells = []
        grid.forEach((row) =>{
            row.forEach((cell) =>{
                if(!this.isTail(cell) || !this.isHead(cell)){
                    emptyCells.push(cell)
                }
            })
        })
        return emptyCells[Math.floor(Math.random()*emptyCells.length)]
    }

    snakeEatsApple = () => {
        const { apple, snake } = this.props;
        return apple.row === snake.head.row
            && apple.col === snake.head.col;
    }

    isOffEdge = () => {
        const { snake } = this.props;    
        if (snake.head.col > 19
            || snake.head.col < 0
            || snake.head.row > 19
            || snake.head.row < 0) {
            return true;
        }
    }

    isHead = (cell) => {
        const { snake } = this.props;
        return snake.head.row === cell.row
            && snake.head.col === cell.col;
    }

    isApple = (cell) =>{
        const {apple} = this.props
        return apple.row === cell.row
            && apple.col === cell.col;
    }

    isTail = (cell) =>{        
        const {tail} = this.props.snake
        return tail.find((inTail) => {
            return inTail.row === cell.row && inTail.col === cell.col
        })
    }

    moveSnake = (event) => {
        const {snake} = this.props
        switch(event.keyCode){
            case KEY_UP:
                if(snake.velocity === UP || snake.velocity === DOWN)
                    return
                this.props.updateSnakeVelocity({                    
                    newVelocity: UP
                })
                return
            case KEY_LEFT:
                if(snake.velocity === LEFT || snake.velocity === RIGHT)
                    return
                this.props.updateSnakeVelocity({                    
                    newVelocity: LEFT
                })
                return
            case KEY_DOWN:
                if(snake.velocity === UP || snake.velocity === DOWN)
                    return
                this.props.updateSnakeVelocity({                    
                    newVelocity: DOWN
                })
                return
            case KEY_RIGHT:
                if(snake.velocity === LEFT || snake.velocity === RIGHT)
                    return
                this.props.updateSnakeVelocity({                    
                    newVelocity: RIGHT
                })
                return
            default:
                return
        }
    }
    
    renderGrid = () =>{        
        const { grid, snake } = this.props;
        return(
            <div className="center">
                <h3 className="score">Score: {snake.tail.length-2}</h3>
                <section className="grid">
                {
                    grid.map((row) => (
                        row.map(cell => (
                        <div key={`${cell.row} ${cell.col}`} 
                            className={`cell ${this.isHead(cell)
                            ? 'head' : this.isApple(cell)
                            ? 'apple' : this.isTail(cell)
                            ? 'tail' : ''}`
                            }>
                        </div>
                        ))
                    ))
                }
                </section>
            </div>
        )
    }

    renderGameOver = () =>{
        return(
            <div className="card text-center">
                <div className="card-body">
                    <h1 className="card-title">You bit yourself!!</h1>
                    <p className="card-text">Your Score is: {this.props.snake.tail.length-2}</p>
                    <button className="btn btn-primary" onClick={this.start}>
                        Restart
                    </button>
                </div>
            </div>
        )
    }

    render() {
        return (
        <div className="App">
            { this.props.gameOver? this.renderGameOver() : this.renderGrid()}
        </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        grid: state.game.grid,
        apple: state.game.apple,
        snake: state.game.snake,
        gameOver: state.game.gameOver
    }
}

export default connect(
    mapStateToProps, {
        reset,
        createApple,
        setGameOver,
        updateSnakeTail, 
        updateSnakeHead, 
        updateSnakeVelocity
    }
    )(App);
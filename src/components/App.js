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
        const isEat = this.snakeEatsApple()
        const newHead = {
            row: snake.head.row + snake.velocity.y,
            col: snake.head.col + snake.velocity.x
        }        
        let newTail = [snake.head, ...snake.tail]
        let newApple = apple
        if(isEat){
            newApple = this.getRandomApple()
        }else{
            newTail.pop()
        }

        //updating redux state
        this.props.createApple({
            newApple
        })
        this.props.updateSnakeHead({
            newHead
        })
        this.props.updateSnakeTail({
            newTail
        })

        //game over condition
        if (this.isOffEdge() || this.isTail(this.props.snake.head)) {
            this.props.setGameOver({
                flag: true
            })
            return
        }
        //restart loop after defined time
        setTimeout(() => {
            this.gameLoop()
        }, GAME_SPEED)
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
        switch(event.keyCode){
            case KEY_UP:
                this.props.updateSnakeVelocity({                    
                    newVelocity: UP
                })
                return
            case KEY_LEFT:
                this.props.updateSnakeVelocity({                    
                    newVelocity: LEFT
                })
                return
            case KEY_DOWN:
                this.props.updateSnakeVelocity({                    
                    newVelocity: DOWN
                })
                return
            case KEY_RIGHT:
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
                <h2>Score: {snake.tail.length-2}</h2>
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
                    <h1 className="card-title">Game Over!!</h1>
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
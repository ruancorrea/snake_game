import React from "react";
import Food from "../components/Food";
import Snake from "../components/Snake";
import InfoScore from "./InfoScore";

const getRandomCoords = () => {
  let min = 1;
  let max = 90
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const inicialState = {
    food: getRandomCoords(),
    speed: 500,
    pause: false,
    play: false,
    gameOver: "",
    direction: 'RIGHT',
    snakeDots: [
      [0,0],[2,0]
    ]
}

class Game extends React.Component {
  state = inicialState

  componentDidMount(): void {
        setInterval(this.moveSnake, this.state.speed)
        document.onkeydown = this.onKeyDown;

  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
      this.checkIfOutOfBorders();
      this.checkIfCollapsed();
      this.checkIfEat();
  }

  onKeyDown = (e: any) => {
      e = e || window.event;
      switch (e.keyCode) {
            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                this.setState({direction: 'RIGHT'});
                break;
        
      }
      //console.log(this.state.direction)

  }

  moveSnake = () => {
        let dots = [...this.state.snakeDots]
        let head = dots[dots.length - 1]

        switch (this.state.direction){
            case 'RIGHT':
                head = [head[0] + 2, head[1]]
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]]
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2]
                break;
            case 'UP':
                head = [head[0], head[1] - 2]
                break;
        }
        if(!this.state.pause && this.state.play) {

            dots.push(head);
            dots.shift();
            this.setState({
                snakeDots: dots
            })
        }
    
  }

  checkIfOutOfBorders() {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
          this.onGameOver();
      }
  }

  checkIfCollapsed() {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      snake.pop()
      snake.forEach(dot => {
          if (head[0] == dot[0] && head[1] == dot[1]){
              this.onGameOver();
          }
      })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if(head[0] == food[0] && head[1] == food[1]) {
        this.setState({
            food: getRandomCoords()
        })
        this.enlargeSnake();
        this.increaseSpeed();
    }
  }

  enlargeSnake(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
        snakeDots: newSnake
    })
  }

  increaseSpeed() {
      if(this.state.speed > 10) {
          this.setState({
              speed:this.state.speed - 10
          })
      }
  }

  onGameOver() {
        this.setState(inicialState);
        this.setState({gameOver: `Game Over! Your Score was ${this.state.snakeDots.length} Try Again`})

    }

  render() {
    return (
      <div>
          <div className="flex my-2 justify-center">
                <button className="rounded-md w-32 px-2 py-1 bg-slate-700 text-white" onClick={() => {
                    if(this.state.play) {
                        this.setState(inicialState);
                    } else this.setState({play: true})
                }}>{this.state.play ? "End Game" : "Play Game"}</button>
                {this.state.play ? 
                    <button className="ml-2 rounded-md w-32 px-2 py-1 bg-slate-700 text-white" onClick={() => {
                        this.setState({pause: this.state.pause ? false : true})
                    }}>{this.state.pause ? "Return Game" : "Pause Game"}</button>
                    :
                    <></>
                }
            </div>
          {
              this.state.play ?
                <div className={`game-area ${this.state.pause ? "bg-gray-500" : "bg-gray-200"} rounded-lg`}>
                  <Snake snakeDots={this.state.snakeDots}/>
                    <Food dot={this.state.food}/>
                    <InfoScore score={this.state.snakeDots.length}/>
                  </div>
              :
                <div className="text-white font-bold flex items-center">
                    {this.state.gameOver}
                </div>
          }
      </div>
    )
  }
}

export default Game;
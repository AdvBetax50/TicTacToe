import { Component } from '@angular/core';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  squares: any[];
  isXTurn: boolean;
  winner: string;

  constructor(){
    this.squares = [];
    this.isXTurn = true;
    this.winner = '';
  }

  ngOnInit() {
    this.newGame();
  }
  
  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isXTurn = true;
  }

  get player(){
    return this.isXTurn ? 'X' : 'O';
  }

  makeMove(position: number){
    if (!this.squares[position]){
      this.squares.splice(position, 1, this.player); 
      this.isXTurn = !this.isXTurn;
      this.calculateWinner();
    }
  }

  calculateWinner(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (
        this.squares[a] && 
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
  return '';
  }
}

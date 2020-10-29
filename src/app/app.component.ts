import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvasEl', {static: false})
  canvasEl: ElementRef;

  public context: CanvasRenderingContext2D;

  title = 'SudokuSolver';
  game = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9]
  ];

  // Type: 0 => Empty  1 => Initial  2 =>User Filled
  type = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1]
  ];

  square = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
  ];

  colorTextInitial = '#ffa500';
  colorTextUserFilled = '#000000';
  font = 'bold 40px "Lucida Bright"';

  setTextColor(idxF, idxC) {
    if (this.type[idxF][idxC] === 1) {
      return this.colorTextInitial;
    } else if(this.type[idxF][idxC] === 2) {
      return this.colorTextUserFilled;
    } else {
      return '#ff0000'; //Aquest cas no hauria de passar mai. Pinta vermell.
    }
  }

  ngAfterViewInit(): void {
    this.context = this.canvasEl.nativeElement.getContext('2d');
    this.setup();
    this.draw();
  }

  private setup() {
    this.context.font = 'bold 40px "Lucida Bright"';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
  }

  private draw() {
    const i = setInterval(() => {
      this.context.clearRect(0, 0, 960, 960);        
      for (let fila = 0; fila < this.game.length; fila++) {
        for (let columna = 0; columna < this.game[fila].length; columna++) {
          this.context.fillStyle = 'rgb(220, 220, 220)';
          this.context.fillRect(columna * 60 + 5 , fila * 60 + 2, 50, 50);
          if (this.game[fila][columna] !== 0) {
            this.context.fillStyle = this.setTextColor(fila, columna);
            this.context.fillText(this.game[fila][columna].toString(), columna * 60 + 30 , fila * 60 + 30);
          }
          this.context.fillStyle = 'black';
          this.context.beginPath();
          this.context.moveTo(180, 0);
          this.context.lineTo(180, 535);
          this.context.moveTo(360, 0);
          this.context.lineTo(360, 535);
          this.context.moveTo(0, 177);
          this.context.lineTo(535, 177);
          this.context.moveTo(0, 357);
          this.context.lineTo(535, 357);
          this.context.stroke();
        }
      }
    }, 200); 
  }

  upgrade() {
    this.game[0][0] += 1;
    console.log(this.game[0][0]);
  }
}

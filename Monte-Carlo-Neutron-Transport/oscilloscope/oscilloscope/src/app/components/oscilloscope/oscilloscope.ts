import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-oscilloscope',
  imports: [],
  standalone: true,
  templateUrl: './oscilloscope.html',
  styleUrl: './oscilloscope.scss',
})
export class Oscilloscope implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private buffer: number[] = [];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.buffer = new Array(canvas.width).fill(0);

    this.loop();
  }

  loop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  };

  update() {
    this.buffer.shift();

    // fake signal (noise for now)
    const value = Math.random() * 0.2;

    this.buffer.push(value);
  }

  draw() {
    const canvas = this.canvasRef.nativeElement;

    // clear
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // line
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.beginPath();

    const mid = canvas.height / 2;

    this.buffer.forEach((v, i) => {
      const y = mid - v * 100;

      if (i === 0) {
        this.ctx.moveTo(i, y);
      } else {
        this.ctx.lineTo(i, y);
      }
    });

    this.ctx.stroke();
  }
}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { inject } from '@angular/core';
import { FissionData } from '../../service/fission-data';
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
  private signal: number[] = [];
  private cursor = 0;

  constructor() {}

  private service = inject(FissionData);

  async ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.buffer = new Array(canvas.width).fill(0);

    const raw = await this.service.loadGenerationCounts();
    const max = Math.max(...raw);
    this.signal = raw.map((v: any) => v / max); 

    this.loop();
  }

  loop = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  };

  update() {
    this.buffer.shift();
    const value = this.signal.length
      ? this.signal[this.cursor++ % this.signal.length]
      : 0;
    this.buffer.push(value);
  }

  draw() {
    const canvas = this.canvasRef.nativeElement;

    // clear
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- GRID ---
    this.ctx.strokeStyle = 'rgba(0,255,100,0.1)';
    this.ctx.beginPath();

    for (let x = 0; x < canvas.width; x += 50) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, canvas.height);
    }

    for (let y = 0; y < canvas.height; y += 50) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(canvas.width, y);
    }

    this.ctx.stroke();

    // --- SIGNAL LINE ---
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FissionData {
  constructor(private http: HttpClient) {}

  async loadGenerationCounts(): Promise<number[]> {
    const csv = await firstValueFrom(
      this.http.get('fissions.csv', { responseType: 'text' })
    );
    console.log('Loaded fissions.csv:', csv.slice(0, 100) + '...');
    const counts: Record<number, number> = {};
    csv.trim().split('\n').forEach(line => {
      const [gen] = line.split(',');
      const g = Number(gen);
      counts[g] = (counts[g] ?? 0) + 1;
    });

    const maxGen = Math.max(...Object.keys(counts).map(Number));
    return Array.from({ length: maxGen + 1 }, (_, i) => counts[i] ?? 0);
  }
}

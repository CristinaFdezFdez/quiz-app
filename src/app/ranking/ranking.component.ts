import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  ranking: { position: number, nombre: string, puntuacion: number }[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedRanking = localStorage.getItem('ranking');
      const rankingArray = storedRanking ? JSON.parse(storedRanking) : [];

      // Calcular la posición
      this.ranking = rankingArray.map((item: any, index: number) => ({
        ...item,
        position: index + 1
      }));
    }
  }
}

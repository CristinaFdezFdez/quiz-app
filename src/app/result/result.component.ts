import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  score: number = 0;
  playerName: string = '';

  constructor(private router: Router) {
    this.score = Number(localStorage.getItem('userScore')) || 0;
  }

  submitScore(): void {
    if (!this.playerName.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    ranking.push({ nombre: this.playerName, puntuacion: this.score });
    ranking.sort((a: any, b: any) => b.puntuacion - a.puntuacion);
    localStorage.setItem('ranking', JSON.stringify(ranking.slice(0, 10)));
    this.router.navigate(['/ranking']);
  }
}

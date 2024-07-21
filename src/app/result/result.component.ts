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
    // Obtén la puntuación del localStorage si existe
    this.score = Number(localStorage.getItem('userScore')) || 0;
  }

  submitScore(): void {
    // Asegúrate de que el nombre del jugador no esté vacío
    if (!this.playerName.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    // Recupera el ranking actual o inicializa uno vacío si no existe
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');

    // Añade el nuevo puntaje al ranking
    ranking.push({ nombre: this.playerName, puntuacion: this.score });

    // Ordena el ranking por puntuación en orden descendente
    ranking.sort((a: any, b: any) => b.puntuacion - a.puntuacion);

    // Guarda solo los 10 mejores puntajes en localStorage
    localStorage.setItem('ranking', JSON.stringify(ranking.slice(0, 10)));

    // Navega a la página de ranking
    this.router.navigate(['/ranking']);
  }
}

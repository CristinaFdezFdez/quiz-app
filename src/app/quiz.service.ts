import { Injectable } from '@angular/core';

interface Pregunta {
  enunciado: string;
  opciones: string[];
  respuestaCorrecta: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private preguntas: Pregunta[] = [
    {
      enunciado: '¿Cuál es la capital de Francia?',
      opciones: ['París', 'Londres', 'Roma'],
      respuestaCorrecta: 0
    },
    {
      enunciado: '¿Cuál es el planeta más grande del sistema solar?',
      opciones: ['Tierra', 'Júpiter', 'Saturno'],
      respuestaCorrecta: 1
    }
    // Agrega más preguntas aquí
  ];

  constructor() { }

  obtenerPreguntasAleatorias(): Pregunta[] {
    return this.preguntas.sort(() => Math.random() - 0.5).slice(0, 10);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any[] = [
    {
      question: '¿Quién es el piloto con más títulos de MotoGP?',
      answers: ['Valentino Rossi', 'Giacomo Agostini', 'Marc Márquez'],
      correctAnswerIndex: 1 // Agostini
    },
    {
      question: '¿En qué año ganó Valentino Rossi su primer campeonato de MotoGP?',
      answers: ['1998', '2001', '2005'],
      correctAnswerIndex: 1 // 2001
    },
    {
      question: '¿Cuál es el equipo para el que corre actualmente (2024) Marc Márquez?',
      answers: ['Gresini', 'Yamaha', 'Honda'],
      correctAnswerIndex: 0 // Gresini
    },
    {
      question: '¿Qué piloto ganó el campeonato de MotoGP en 2023?',
      answers: ['Fabio Quartararo', 'Pecco Bagnaia', 'Jorge Martín'],
      correctAnswerIndex: 1 // Pecco Bagnaia
    },
    {
      question: '¿Cuál es el nombre del circuito más largo en el calendario de MotoGP?',
      answers: ['Circuito de Mugello', 'Circuito de Phillip Island', 'Circuito de Spa-Francorchamps'],
      correctAnswerIndex: 0 // Circuito de Mugello
    },
    {
      question: '¿Quién fue el primer piloto en ganar un campeonato de MotoGP con una moto electrónica en 2020?',
      answers: ['Andrea Dovizioso', 'Maverick Viñales', 'Joan Mir'],
      correctAnswerIndex: 2 // Joan Mir
    },
    {
      question: '¿Cuál es el apodo de Valentino Rossi?',
      answers: ['Il Dottore', 'Pato', 'The medico'],
      correctAnswerIndex: 0 // Il Dottore
    },
    {
      question: '¿Qué piloto italiano es conocido como "The Doctor"?',
      answers: ['Luca Cadalora', 'Valentino Rossi', 'Marco Melandri'],
      correctAnswerIndex: 1 // Valentino Rossi
    },
    {
      question: '¿Cuál es el nombre del circuito que se encuentra en la isla de Phillip Island?',
      answers: ['Mugello Circuit', 'Phillip Island Circuit', 'Laguna Seca'],
      correctAnswerIndex: 1 // Phillip Island Circuit
    },
    {
      question: '¿Qué fabricante de motos es conocido por su famoso modelo M1?',
      answers: ['Yamaha', 'Suzuki', 'Kawasaki'],
      correctAnswerIndex: 0 // Yamaha
    }
  ];
  currentQuestionIndex: number = 0;
  currentQuestion: any = {};
  timer: number = 30;
  timerSubscription: Subscription = new Subscription();
  isAnswerSelected: boolean = false;
  userScore: number = 0;
  feedback: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadQuestion();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  loadQuestion(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.timer = 30;
    this.isAnswerSelected = false;
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timer > 0 && !this.isAnswerSelected) {
        this.timer--;
      } else if (this.timer === 0 && !this.isAnswerSelected) {
        this.checkAnswer(-1); // Considerar respuesta incorrecta si el tiempo se acaba
      }
    });
  }

  checkAnswer(selectedAnswerIndex: number): void {
    this.isAnswerSelected = true;
    this.timerSubscription.unsubscribe(); // Detener el temporizador

    const correctAnswerIndex = this.currentQuestion.correctAnswerIndex;
    if (selectedAnswerIndex === correctAnswerIndex) {
      this.feedback = '¡Respuesta correcta!';
      this.userScore += this.timer; // Añadir puntuación basada en el tiempo restante
    } else {
      this.feedback = `Respuesta incorrecta. La respuesta correcta es: ${this.currentQuestion.answers[correctAnswerIndex]}`;
    }

    setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.loadQuestion();
        this.startTimer();
      } else {
        this.endQuiz();
      }
    }, 2000); // Mostrar el feedback durante 2 segundos antes de cargar la siguiente pregunta
  }

  endQuiz(): void {
    // Guardar puntuación y redirigir a la página de resultados
    localStorage.setItem('userScore', this.userScore.toString());
    this.router.navigate(['/result']);
  }
}

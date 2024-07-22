import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Asegúrate de importar HttpClientModule aquí
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: any = {};
  timer: number = 30;
  timerSubscription: Subscription = new Subscription();
  isAnswerSelected: boolean = false;
  userScore: number = 0;
  feedback: string = '';

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe((data: any) => {
      this.questions = data.results.map((q: any) => ({
        question: q.question,
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correctAnswerIndex: q.incorrect_answers.length
      }));
      this.loadQuestion();
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  loadQuestion(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.timer = 30;
    this.isAnswerSelected = false;
    this.feedback = ''; // Limpiar feedback al cargar una nueva pregunta
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

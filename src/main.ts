import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { QuizComponent } from './app/quiz/quiz.component';
import { ResultComponent } from './app/result/result.component';
import { RankingComponent } from './app/ranking/ranking.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'quiz', component: QuizComponent },
      { path: 'result', component: ResultComponent },
      { path: 'ranking', component: RankingComponent },
    ]),
    importProvidersFrom(RouterModule),
  ],
}).catch(err => console.error(err));

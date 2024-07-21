import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'result', component: ResultComponent },
    { path: 'ranking', component: RankingComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

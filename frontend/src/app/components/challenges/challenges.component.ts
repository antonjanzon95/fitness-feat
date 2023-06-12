import { Component, OnInit } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { ChallengeService } from 'src/app/services/challenge/challenge.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  challenges: IChallenge[] = [];
  currentChallenge: IChallenge | undefined;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.challengeService.getChallenges().subscribe({
      next: (val) => {
        this.challenges = val;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setCurrentChallenge(challenge: IChallenge): void {
    this.currentChallenge = challenge;
  }

  resetCurrentChallenge(): void {
    this.currentChallenge = undefined;
  }
}

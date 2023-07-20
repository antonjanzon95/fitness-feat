import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { IChallenge } from 'src/app/models/IChallenge';

@Component({
  selector: 'app-challenge-weight-chart',
  templateUrl: './challenge-weight-chart.component.html',
  styleUrls: ['./challenge-weight-chart.component.css'],
})
export class ChallengeWeightChartComponent implements OnInit {
  @Input() currentChallenge: IChallenge | undefined;
  userIds: string[] = [];
  isLoading: boolean = true;
  chartData: number[] = [];
  chartLabels: string[] = [];

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        suggestedMin: 10,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  private setChartData() {
    if (!this.currentChallenge) return;
    this.currentChallenge.participants.forEach((participant) => {
      const participantEntries = this.currentChallenge!.weightEntries.filter(
        (entry) => entry.user._id === participant._id
      );
      if (participantEntries.length < 1) return;
      const rbg = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ];
      const startingWeight = participantEntries[0].weight;
      const participantDataSet = {
        data: participantEntries.map((entry, index) =>
          index === 0 ? 0 : entry.weight - startingWeight!
        ),
        label: participant.name,
        backgroundColor: `rgba(${rbg[0]}, ${rbg[1]}, ${rbg[2]}, 0.2)`,
        borderColor: `rgba(${rbg[0]}, ${rbg[1]}, ${rbg[2]}, 1)`,
        pointBackgroundColor: `rgba(${rbg[0]}, ${rbg[1]}, ${rbg[2]}, 1)`,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      };
      this.lineChartData.datasets.push(participantDataSet);
    });

    // labels
    const amountOfWeeks = Math.ceil(
      this.currentChallenge.weightEntries.length /
        this.currentChallenge.participants.length
    );

    const labels = [];

    for (let i = 0; i < amountOfWeeks; i++) {
      labels.push(`Week ${i + 1}`);
    }

    this.lineChartData.labels = labels;

    //scales
    const allDataPoints: number[] = this.lineChartData.datasets
      .flatMap((dataset) => dataset.data as number[])
      .filter((value) => !isNaN(value));

    const min = Math.min(...allDataPoints);
    const max = Math.max(...allDataPoints);

    this.lineChartOptions!.scales = {
      y: {
        suggestedMin: min - 3,
        suggestedMax: max + 3,
      },
    };

    this.isLoading = false;
  }

  ngOnInit(): void {
    this.setChartData();
  }
}

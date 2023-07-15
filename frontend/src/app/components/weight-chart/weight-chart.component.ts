import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { UserActions } from 'src/app/state/user/user.actions';
import {
  selectCurrentUser,
  selectWeightEntries,
} from 'src/app/state/user/user.selector';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.css'],
})
export class WeightChartComponent implements OnInit, OnDestroy {
  weightEntries$ = this.store.select(selectWeightEntries);
  user$ = this.store.select(selectCurrentUser);
  weightSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  startingWeight: number | undefined;

  nameLabel: string = '';
  chartData: number[] = [];
  chartLabels: string[] = [];

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {};

  constructor(private store: Store<IAppState>) {
    store.dispatch(UserActions.getWeightEntries());
  }

  private updateChartLabel() {
    this.lineChartData.datasets[0].label = this.nameLabel;
  }

  ngOnInit() {
    this.weightSubscription = this.weightEntries$.subscribe((entries) => {
      if (!entries) return;
      this.startingWeight = entries[0].weight;

      this.chartData = entries.map((entry, index) =>
        index === 0 ? 0 : entry.weight - this.startingWeight!
      );
      this.chartLabels = entries.map((entry) => entry.timestamp.toString());

      this.lineChartOptions = {
        scales: {
          y: {
            suggestedMin: -10,
            suggestedMax: 10,
          },
        },
        plugins: {
          legend: { display: true },
        },
      };

      this.lineChartData = {
        datasets: [
          {
            data: this.chartData,
            label: this.nameLabel,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          },
        ],
        labels: this.chartLabels,
      };
    });

    this.userSubscription = this.user$.subscribe((user) => {
      if (!user) return;
      this.nameLabel = user.name;
      this.updateChartLabel();
    });
  }

  ngOnDestroy() {
    this.weightSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}

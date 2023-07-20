import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
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
  combinedSubscription: Subscription | undefined;
  startingWeight: number | undefined;
  isLoading: boolean = true;
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

  private updateChartLabel(name: string) {
    this.lineChartData.datasets[0].label = name;
  }

  ngOnInit() {
    this.combinedSubscription = combineLatest([
      this.weightEntries$,
      this.user$,
    ]).subscribe(([entries, user]) => {
      if (!entries || !user) return;
      this.startingWeight = entries[0].weight;

      this.chartData = entries.map((entry, index) =>
        index === 0 ? 0 : entry.weight - this.startingWeight!
      );
      this.chartLabels = entries.map((entry, index) => `Week ${index + 1}`);

      this.lineChartOptions = {
        elements: {
          line: {
            tension: 0.5,
          },
        },
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
            label: 'Weight',
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

      this.updateChartLabel(user.name);

      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.combinedSubscription?.unsubscribe();
  }
}

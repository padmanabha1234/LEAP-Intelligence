import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Highcharts from "highcharts/highstock";

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit, OnChanges {
  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;

  @ViewChild('container') container: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options !== undefined) {
      setTimeout(() => {
        this.createMultiBarChart(this.options);
      }, 100);
    }
  }

  createMultiBarChart(options: Highcharts.Options | undefined): void {
    let ref: ScatterChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'scatter',
        marginTop: 50
      },
      title: {
          text: ""
      },
      xAxis: {
          min: 0,
          title: {
              text: null
          },
          scrollbar: {
            enabled: false
          },
          gridLineColor: 'transparent',
          tickInterval: 10,
          labels: {
            style: {
              fontSize: '0.7rem'
            }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: null
          },
          gridLineColor: 'transparent',
          tickInterval: 10,
          labels: {
            style: {
              fontSize: '0.7rem'
            }
          }
      },
      plotOptions: {
        scatter: {
          marker: {
              radius: 5,
              states: {
                  hover: {
                      enabled: true,
                      lineColor: 'rgb(100,100,100)'
                  }
              }
          },
          states: {
              hover: {
                enabled: false
              }
          }
        },
        series: {
          stickyTracking: false,
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            }
          },
          dataLabels: {
            style: {
              fontSize: '0.7rem'
            }
          }
        }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          floating: true,
          borderWidth: 0,
          shadow: false,
          itemStyle: {
            fontSize: '0.7rem'
          }
      },
      credits: {
          enabled: false
      },
      series: [],
      responsive: {
        rules: [
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '0.9rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '0.9rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '1rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '1rem'
                }
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '0.9rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 1920 && window.innerWidth < 2048;
              },
              minWidth: 1920,
              maxWidth: 2048
            }
          },
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '1.5rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '1.2rem'
                }
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '1rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 2048 && window.innerWidth < 2560;
              },
              minWidth: 2048,
              maxWidth: 2560
            }
          },
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1.2rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1.2rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '2rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '1.5rem'
                }
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '1.5rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 2560 && window.innerWidth < 3840;
              },
              minWidth: 2560,
              maxWidth: 3840
            }
          },
          {
            chartOptions: {
              xAxis: {
                labels: {
                  style: {
                    fontSize: '1.8rem'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    fontSize: '1.8rem'
                  }
                }
              },
              tooltip: {
                style: {
                  fontSize: '2.5rem'
                }
              },
              legend: {
                itemStyle: {
                  fontSize: '2rem'
                }
              },
              plotOptions: {  
                series: {
                  dataLabels: {
                    style: {
                      fontSize: '1.8rem'
                    }
                  }
                }
              }
            },
            condition: {
              callback: function() {
                return window.innerWidth >= 3840;
              },
              minWidth: 3840
            }
          }
        ]
      }
    };
    this.chart = Highcharts.chart(this.container.nativeElement, Highcharts.merge(defaultOptions, options), function(this: any) {
    });
  }
}

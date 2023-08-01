export interface IDashboardMenu {
    title: string;
    navigationURL: string;
    metrics: IDashboardMetric[];
    icon: string;
    tooltip: string;
    programID?:string;
}

export interface IDashboardMetric {
    name: string;
    value: string;
}
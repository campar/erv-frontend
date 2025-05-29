export class SeriesData {
    value: number;
    name: string;
    extra?: any;
    series?: SeriesData[];

    constructor(name: any, value: number, extra?: any, series?: SeriesData[]) {
        this.name = name;
        this.value = value;
        this.extra = extra;
        this.series = series;
    }
}

export class ChartData {
    name: string;
    series: SeriesData[];

    constructor(name: string, series: SeriesData[]) {
        this.name = name;
        this.series = series;
    }
}

export class ChartProperties {
    xAxisLabel: string;
    yAxisLabel: string;

    constructor(xAxisLabel: string, yAxisLabel: string) {
        this.xAxisLabel = xAxisLabel;
        this.yAxisLabel = yAxisLabel;
    }

}
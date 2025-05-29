import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChartType} from './chart-type.enum';
import {CommonModule} from '@angular/common';
import {ChartData, ChartProperties} from './chart-data.model';
import * as shape from "d3-shape";
import {TranslationService} from '../../../core/services/translation.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() data!: ChartData[];
  @Input() properties!: ChartProperties;
  @Input() view: [number, number] = [700, 400];
  @Input() chartType: ChartType = ChartType.BarVertical; // Default chart type
  @Input() timeline = false;
  translationService = inject(TranslationService)
  cdr = inject(ChangeDetectorRef);
  @ViewChild('containerRef', { static: false }) containerRef!: ElementRef;
  private resizeObserver!: ResizeObserver;

  public ChartType = ChartType;
  public curve = shape.curveMonotoneX;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = this.properties?.xAxisLabel ? this.properties.xAxisLabel : "";
  showYAxisLabel = true;
  yAxisLabel = this.properties?.yAxisLabel ? this.properties.yAxisLabel : "";
  wrapTicks = true;

  ngOnInit(): void {
    this.xAxisLabel = this.properties?.xAxisLabel ? this.properties.xAxisLabel : "";
    this.yAxisLabel = this.properties?.yAxisLabel ? this.properties.yAxisLabel : "";
  }

  ngAfterViewInit() {
    this.setupResizeObserver();
  }

  private setupResizeObserver(): void {
    if (this.containerRef) {
      this.resizeObserver = new ResizeObserver(() => {
        this.cdr.detectChanges();
      });
      this.resizeObserver.observe(this.containerRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  onSelect($event: Event) {
    // console.log("On select")
  }
}

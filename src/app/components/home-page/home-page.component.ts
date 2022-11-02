import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Character} from "../../interfaces/interfaces";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, map, pairwise, throttleTime} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport, {static: true})
  viewScroll!: CdkVirtualScrollViewport;

  public dataCharacters: Character[] = [];
  private nextPage: number = 2;

  constructor(
    private dataService: DataService,
    private ngZone: NgZone,
    private route: Router
  ) { }

  ngAfterViewInit(): void {
    this.viewScroll.elementScrolled().pipe(
      map(() => this.viewScroll.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.dataService.getData(this.nextPage++).subscribe(data => {
          this.dataCharacters = [...this.dataCharacters, ...data.results]
        })
      });
    })
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => {
        this.dataCharacters = data.results;
      }
    });
  }

  public openDetail(id: number): void {
    this.route.navigate(['/details', id])
  }

}

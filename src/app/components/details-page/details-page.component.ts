import { Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {forkJoin, Observable} from "rxjs";
import {Character, Episode} from "../../interfaces/interfaces";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DetailsPageComponent implements OnInit {

  @Input() id!: number;

  public detailsCh!: Character;
  public data: Observable<Episode>[] = [];
  public episodes: Episode[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    })

    this.dataService.getSingleCh(this.id).subscribe({
      next: (_ch) => {
        this.detailsCh = _ch;
        this.data = _ch.episode.map((eps: string) => {
          return this.dataService.getEpisodes(eps);
        })
        forkJoin(
          this.data
        ).subscribe(eps => this.episodes = eps);
      }
    })
  }

  public backToHome(): void {
    this.route.navigate(['/home']);
  }

}

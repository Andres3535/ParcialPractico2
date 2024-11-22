import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
})

export class AnimeDetailComponent implements OnInit {
  
  animeDetail!: Anime;
  
  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  getAnimeDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animeService.getAnime(String(id)).subscribe((anime) => {
        this.animeDetail = anime;
      });
    }
  }

  ngOnInit(): void {
    this.getAnimeDetail();
  }
}

import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  selectedBAnime!: Anime;
  selected = false;
  animes: Array<Anime> = [];
  totalEpisodios = 0; // Almacena el total de episodios
  ratingPromedio = 0; // Almacena el promedio de ratings

  constructor(private animeService: AnimeService) { }

  getAnimes(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      this.animes = animes;
      this.calcularEpyRat(); // Llamar al cálculo tras cargar los animes
    });
  }

  calcularEpyRat(): void {
    let totalEpisodiosTemp = 0;
    let totalRatingTemp = 0;

    this.animes.forEach((anime) => {
      totalEpisodiosTemp += anime.episode;

      // Convertimos el rating a número, manejando posibles errores de conversión
      const ratingNumerico = parseFloat(anime.Rating);
      if (!isNaN(ratingNumerico)) {
        totalRatingTemp += ratingNumerico;
      }
    });

    this.totalEpisodios = totalEpisodiosTemp;
    this.ratingPromedio = this.animes.length > 0 
      ? totalRatingTemp / this.animes.length 
      : 0; // Manejar división por cero
  }

  onSelected(anime: Anime): void {
    this.selected = true;
    this.selectedBAnime = anime;
  }

  ngOnInit() {
    this.getAnimes();
  }
}

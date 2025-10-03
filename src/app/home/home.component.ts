import { Component } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap'; 
declare var bootstrap: any;


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pokemons: any[] = [];
  filteredPokemons: any[] = []; 
  searchTerm: string = '';
  selectedPokemon: any = null;
  

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit() {
    this.pokeapi.getAllPokemons(50).subscribe((data: any) => {
      data.results.forEach((poke: any) => {
        this.pokeapi.getPokemon(poke.name).subscribe((details: any) => {
          const pokemon = {
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
            abilities: details.abilities.map((a: any) => a.ability.name),
            types: details.types.map((t: any) => t.type.name),
            stats: details.stats.map((s: any) =>({
              name: s.stat.name,
              value: s.bae_stat
            }))
          };
          this.pokemons.push(pokemon);
          this.filteredPokemons = [...this.pokemons];
        });
      });
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term){
       this.filteredPokemons = [...this.pokemons];
    }else{
      this.filteredPokemons = this.pokemons.filter(p =>
        p.name.toLowerCase().includes(term)
      );
    }
  }

  details(pokemon: any) {
    this.selectedPokemon = pokemon;
    const modalElement = document.getElementById('pokemonModal');
    if (modalElement) {
      const modal = new Modal(modalElement); 
      modal.show();
    }
  }

  loadRandomPokemons() {
  this.pokemons = [];
  this.filteredPokemons = [];

 
  const randomOffset = Math.floor(Math.random() * 1000);  

  this.pokeapi.getAllPokemons(30, randomOffset).subscribe((data: any) => {
    data.results.forEach((poke: any) => {
      this.pokeapi.getPokemon(poke.name).subscribe((details: any) => {
        const pokemon = {
          name: details.name,
          image: details.sprites.front_default,
          abilities: details.abilities.map((a: any) => a.ability.name),
          types: details.types.map((t: any) => t.type.name),
          stats: details.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat
          }))
        };
        this.pokemons.push(pokemon);
        this.filteredPokemons = [...this.pokemons];
      });
    });
  });
}
}

import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('types')
  getAllTypes() {
    return this.pokemonService.getAllTypes();
  }

  @Get('type/:type')
  getPokemonByType(@Param('type') type: string) {
    return this.pokemonService.getPokemonByType(type);
  }

  @Get(':name')
  getPokemonDetails(@Param('name') name: string) {
    return this.pokemonService.getPokemonDetails(name);
  }
  @Get('image/:name')
  async getPokemonImage(@Param('name') name: string) {
    const imageUrl = await this.pokemonService.getPokemonImage(name);
    return { imageUrl };
  }
}

import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { PokemonService } from './pokemon.service';
import { AuthGuard } from "../auth/auth.guard";
@UseGuards(AuthGuard)
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

  @Post('catch/:name')
  async catchPokemon(@Param('name') name: string, @Req() request: Request) {
    const user = request['user'];
    console.log('User:', user.id);
    return this.pokemonService.catchPokemon(name,user.id);
  }

  @Delete('release/:name')
  async releasePokemon(@Param('name') name: string, @Req() request: Request) {
    const user = request['user'];
    console.log('User:', user.id);
    return this.pokemonService.releasePokemon(name, user.id);
  }

  @Get('caught/:name')
  async isPokemonCaught(@Param('name') name: string, @Req() request: Request) {
    const user = request['user'];
    console.log('User:', user.id);
    return this.pokemonService.isPokemonCaught(name, user.id);
  }
}

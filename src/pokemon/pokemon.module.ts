import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { AxiosService } from "../axios/axios.service";

@Module({
  providers: [PokemonService, AxiosService],
  controllers: [PokemonController]
})
export class PokemonModule {}

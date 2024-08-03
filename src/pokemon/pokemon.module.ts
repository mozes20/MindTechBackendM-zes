import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { AxiosService } from "../axios/axios.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../model/user.entity";
import { CatchedEntity } from "../model/catched.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CatchedEntity,UserEntity]),],
  providers: [PokemonService, AxiosService],
  controllers: [PokemonController]
})
export class PokemonModule {}

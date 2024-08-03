import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../model/user.entity";
import { Repository } from "typeorm";
import { CatchedEntity } from "../model/catched.entity";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class PokemonService {
  constructor(private readonly axiosService: AxiosService,@InjectRepository(CatchedEntity)
  private readonly catchRepository: Repository<CatchedEntity>,
              @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>) {}

  async getAllTypes() {
    const response = await this.axiosService.get('type?offset=0&limit=21');
    return response.data;
  }

  async getPokemonByType(type: string) {
    const response = await this.axiosService.get(`type/${type}`);
    return response.data['pokemon'];
  }

  async getPokemonDetails(name: string) {
    const response = await this.axiosService.get(`pokemon/${name}`);
    return response.data;
  }

  async getPokemonImage(name: string) {
    const response = await this.axiosService.get(`pokemon/${name}`);
    return response.data['sprites']['front_default'];
  }

  async catchPokemon(pokemon: any, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const catched = new CatchedEntity();
    catched.pokemonName = pokemon;
    catched.user = user;
    return this.catchRepository.save(catched);
  }

  async releasePokemon(pokemon: any, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return this.catchRepository.delete({ pokemonName: pokemon, user: user });
  }

  async isPokemonCaught(pokemon: any, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const catched = await this.catchRepository.findOne({
      where: {
        pokemonName: pokemon,
        user: { id: userId }
      },
      relations: ['user']
    });
    return { caught: !!catched };
  }
}

import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class PokemonService {
  constructor(private readonly axiosService: AxiosService) {}

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
}

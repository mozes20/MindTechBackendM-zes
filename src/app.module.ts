import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './model/user.entity';
import { PokemonModule } from './pokemon/pokemon.module';
import { AxiosService } from './axios/axios.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'mysecretpassword',
      database: 'my_database',
      entities: [UserEntity],
      synchronize: true,
      migrationsTableName: 'migration',
    }),
    AuthModule,
    UsersModule,
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService, AxiosService],
})
export class AppModule {}

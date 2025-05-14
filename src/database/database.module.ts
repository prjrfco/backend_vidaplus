import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../common/env-values';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DATABASE_HOST,
      port: +envs.DATABASE_PORT,
      username: envs.DATABASE_USER,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrationsTableName: 'migrations',
      migrations: ['dist/**/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
      migrationsTransactionMode: 'all',
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { VidaPlusModule } from './modulo_geral/vida-plus.module';

@Module({
  imports: [DatabaseModule, VidaPlusModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}

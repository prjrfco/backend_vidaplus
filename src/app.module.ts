import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SegurancaModule } from './modulo_geral/seguranca.module';

@Module({
  imports: [DatabaseModule, SegurancaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}

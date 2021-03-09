import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTION } from './jwt.constants';
import { JwtModuleOption } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOption): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTION,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}

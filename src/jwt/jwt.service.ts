import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTION } from './jwt.constants';
import { JwtModuleOption } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTION) private readonly options: JwtModuleOption,
  ) {}
  hello() {
    console.log('hello');
  }
}

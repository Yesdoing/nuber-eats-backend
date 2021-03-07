import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/createAccount.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exist = await this.user.findOne({ email });

      if (exist) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      await this.user.save(this.user.create({ email, password, role }));
      return { ok: true, error: '' };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }
}

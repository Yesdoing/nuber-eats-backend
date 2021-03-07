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
  }: CreateAccountInput): Promise<string | undefined> {
    try {
      const exist = await this.user.findOne({ email });

      if (exist) {
        return 'There is a user with that email already';
      }

      await this.user.save(this.user.create({ email, password, role }));
    } catch (e) {
      return "Couldn't create account";
    }
  }
}

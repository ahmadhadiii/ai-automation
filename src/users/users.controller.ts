import { Controller, Get, Query, Request } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('Admin')
  findAll(@Request() req: any, @Query() query: any) {
    return this.usersService.findAll(req.user.tenant_id, query);
  }
}

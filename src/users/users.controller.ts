import { Controller, Get, Query, Request } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { AuthRequest } from '../auth/auth-request.interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('Admin')
  findAll(@Request() req: AuthRequest, @Query() query: PaginationQueryDto) {
    return this.usersService.findAll(req.user.tenant_id, query);
  }
}

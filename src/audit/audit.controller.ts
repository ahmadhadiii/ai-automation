import { Controller, Get, Query, Request } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { AuditService } from './audit.service';
import { AuthRequest } from '../auth/auth-request.interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles('Admin')
  findAll(@Request() req: AuthRequest, @Query() query: PaginationQueryDto) {
    return this.auditService.findAll(req.user.tenant_id, query);
  }
}

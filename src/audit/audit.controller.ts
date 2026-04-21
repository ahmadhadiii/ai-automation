import { Controller, Get, Query, Request } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { AuditService } from './audit.service';

@Controller('api/audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles('Admin')
  findAll(@Request() req: any, @Query() query: any) {
    return this.auditService.findAll(req.user.tenant_id, query);
  }
}

import { Controller, Get, Request } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles('Admin')
  findAll(@Request() req: any) {
    return this.auditService.findByTenant(req.user.tenant_id);
  }
}

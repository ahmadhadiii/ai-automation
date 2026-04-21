import { Controller, Get, Patch, Param, Query, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthRequest } from '../auth/auth-request.interface';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Request() req: AuthRequest, @Query() query: PaginationQueryDto) {
    return this.notificationsService.findAll(req.user.tenant_id, req.user.id, query);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.notificationsService.markAsRead(id, req.user.id, req.user.tenant_id);
  }
}

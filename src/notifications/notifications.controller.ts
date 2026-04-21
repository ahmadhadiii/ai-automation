import { Controller, Get, Patch, Param, Query, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    return this.notificationsService.findAll(req.user.tenant_id, req.user.id, query);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Request() req: any) {
    return this.notificationsService.markAsRead(id, req.user.id, req.user.tenant_id);
  }
}

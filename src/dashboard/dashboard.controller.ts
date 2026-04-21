import { Controller, Get, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthRequest } from '../auth/auth-request.interface';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Request() req: AuthRequest) {
    return this.dashboardService.getDashboard(req.user.tenant_id);
  }
}

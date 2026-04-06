import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { KyselyDatabaseModule } from './modules/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditModule } from './audit/audit.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    DatabaseModule,
    KyselyDatabaseModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
    AttachmentsModule,
    NotificationsModule,
    AuditModule,
    DashboardModule,
  ],
})
export class AppModule {}

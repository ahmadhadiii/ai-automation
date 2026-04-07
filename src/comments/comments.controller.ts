import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto, @Request() req: any) {
    return this.commentsService.create(dto, req.user.id, req.user.tenant_id);
  }

  @Get('task/:taskId')
  findByTask(@Param('taskId') taskId: string, @Request() req: any) {
    return this.commentsService.findByTask(taskId, req.user.tenant_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.commentsService.findOne(id, req.user.tenant_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.commentsService.remove(id, req.user.id, req.user.tenant_id);
  }
}

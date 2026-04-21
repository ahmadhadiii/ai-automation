import {
  Controller,
  Post,
  Body,
  Param,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('taskId') taskId: string,
    @Body() dto: CreateCommentDto,
    @Request() req: any,
  ) {
    return this.commentsService.create(taskId, req.user.id, req.user.tenant_id, dto);
  }
}

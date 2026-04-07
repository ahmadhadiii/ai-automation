"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const database_service_1 = require("../database/database.service");
let CommentsService = class CommentsService {
    constructor(db) {
        this.db = db;
    }
    async create(dto, userId, tenantId) {
        const task = await this.db
            .selectFrom('tasks')
            .selectAll()
            .where('id', '=', dto.task_id)
            .where('tenant_id', '=', tenantId)
            .executeTakeFirst();
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        const id = (0, uuid_1.v4)();
        return this.db
            .insertInto('comments')
            .values({
            id,
            task_id: dto.task_id,
            user_id: userId,
            organization_id: task.organization_id,
            content: dto.content,
            tenant_id: tenantId,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async findByTask(taskId, tenantId) {
        return this.db
            .selectFrom('comments')
            .selectAll()
            .where('task_id', '=', taskId)
            .where('tenant_id', '=', tenantId)
            .orderBy('created_at', 'asc')
            .execute();
    }
    async findOne(id, tenantId) {
        const comment = await this.db
            .selectFrom('comments')
            .selectAll()
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .executeTakeFirst();
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return comment;
    }
    async remove(id, userId, tenantId) {
        const comment = await this.db
            .selectFrom('comments')
            .selectAll()
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .executeTakeFirst();
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        if (comment.user_id !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own comments');
        }
        await this.db
            .deleteFrom('comments')
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .execute();
        return { deleted: true };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map
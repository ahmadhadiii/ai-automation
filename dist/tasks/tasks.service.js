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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const database_service_1 = require("../database/database.service");
let TasksService = class TasksService {
    constructor(db) {
        this.db = db;
    }
    async create(dto, userId, tenantId) {
        const project = await this.db
            .selectFrom('projects')
            .selectAll()
            .where('id', '=', dto.project_id)
            .where('tenant_id', '=', tenantId)
            .executeTakeFirst();
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const id = (0, uuid_1.v4)();
        return this.db
            .insertInto('tasks')
            .values({
            id,
            title: dto.title,
            description: dto.description || null,
            status: dto.status || 'ToDo',
            project_id: dto.project_id,
            organization_id: project.organization_id,
            assignee_id: dto.assignee_id || null,
            created_by: userId,
            tenant_id: tenantId,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async findAll(tenantId) {
        return this.db
            .selectFrom('tasks')
            .selectAll()
            .where('tenant_id', '=', tenantId)
            .orderBy('created_at', 'desc')
            .execute();
    }
    async findOne(id, tenantId) {
        const task = await this.db
            .selectFrom('tasks')
            .selectAll()
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .executeTakeFirst();
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return task;
    }
    async update(id, dto, tenantId) {
        const updateData = {};
        if (dto.title !== undefined)
            updateData.title = dto.title;
        if (dto.description !== undefined)
            updateData.description = dto.description;
        if (dto.status !== undefined)
            updateData.status = dto.status;
        if (dto.assignee_id !== undefined)
            updateData.assignee_id = dto.assignee_id;
        if (dto.due_date !== undefined)
            updateData.due_date = new Date(dto.due_date);
        const task = await this.db
            .updateTable('tasks')
            .set(updateData)
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .returningAll()
            .executeTakeFirst();
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return task;
    }
    async remove(id, tenantId) {
        const result = await this.db
            .deleteFrom('tasks')
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .returningAll()
            .executeTakeFirst();
        if (!result) {
            throw new common_1.NotFoundException('Task not found');
        }
        return result;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
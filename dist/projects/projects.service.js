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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const database_service_1 = require("../database/database.service");
let ProjectsService = class ProjectsService {
    constructor(db) {
        this.db = db;
    }
    async create(dto, userId, tenantId) {
        const id = (0, uuid_1.v4)();
        return this.db
            .insertInto('projects')
            .values({
            id,
            name: dto.name,
            organization_id: dto.organization_id,
            created_by: userId,
            status: 'Active',
            tenant_id: tenantId,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async findAll(tenantId) {
        return this.db
            .selectFrom('projects')
            .selectAll()
            .where('tenant_id', '=', tenantId)
            .orderBy('created_at', 'desc')
            .execute();
    }
    async findOne(id, tenantId) {
        const project = await this.db
            .selectFrom('projects')
            .selectAll()
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .executeTakeFirst();
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async update(id, dto, tenantId) {
        const project = await this.db
            .updateTable('projects')
            .set({ ...dto })
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .returningAll()
            .executeTakeFirst();
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async remove(id, tenantId) {
        const result = await this.db
            .deleteFrom('projects')
            .where('id', '=', id)
            .where('tenant_id', '=', tenantId)
            .returningAll()
            .executeTakeFirst();
        if (!result) {
            throw new common_1.NotFoundException('Project not found');
        }
        return result;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map
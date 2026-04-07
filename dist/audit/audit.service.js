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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const database_service_1 = require("../database/database.service");
let AuditService = class AuditService {
    constructor(db) {
        this.db = db;
    }
    async log(userId, action, entityType, entityId, tenantId, organizationId) {
        return this.db
            .insertInto('audit_logs')
            .values({
            id: (0, uuid_1.v4)(),
            user_id: userId,
            action,
            entity_type: entityType,
            entity_id: entityId,
            tenant_id: tenantId,
            organization_id: organizationId,
        })
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async findByTenant(tenantId) {
        return this.db
            .selectFrom('audit_logs')
            .selectAll()
            .where('tenant_id', '=', tenantId)
            .orderBy('created_at', 'desc')
            .execute();
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuditService);
//# sourceMappingURL=audit.service.js.map
import { DatabaseService } from '../database/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateProjectDto, userId: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        status: "Active" | "Archived";
        created_by: string;
    }>;
    findAll(tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        status: "Active" | "Archived";
        created_by: string;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        status: "Active" | "Archived";
        created_by: string;
    }>;
    update(id: string, dto: UpdateProjectDto, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        status: "Active" | "Archived";
        created_by: string;
    }>;
    remove(id: string, tenantId: string): Promise<{
        tenant_id: string;
        organization_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        status: "Active" | "Archived";
        created_by: string;
    }>;
}

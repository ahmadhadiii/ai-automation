import { DatabaseService } from '../database/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateProjectDto, userId: string, tenantId: string): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
    findAll(tenantId: string): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
    update(id: string, dto: UpdateProjectDto, tenantId: string): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
    remove(id: string, tenantId: string): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
}

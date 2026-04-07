import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(dto: CreateProjectDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, dto: UpdateProjectDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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

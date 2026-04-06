import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(dto: CreateProjectDto, req: any): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
    findAll(req: any): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }[]>;
    findOne(id: string, req: any): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
    update(id: string, dto: UpdateProjectDto, req: any): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
    remove(id: string, req: any): Promise<{
        name: string;
        tenant_id: string;
        id: string;
        created_at: Date;
        description: string | null;
        owner_id: string;
        status: string;
    }>;
}

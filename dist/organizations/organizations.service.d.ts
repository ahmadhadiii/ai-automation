import { DatabaseService } from '../database/database.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
export declare class OrganizationsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(dto: CreateOrganizationDto): Promise<{
        organizationId: string;
        userId: string;
    }>;
}

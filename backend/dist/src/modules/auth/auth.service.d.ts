import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma.service";
import { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
}

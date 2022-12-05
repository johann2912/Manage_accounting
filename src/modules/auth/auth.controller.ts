import { Body, Controller, Delete, Patch, Post, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AccessGuard } from "src/lib/guards/access.guard";
import { RefreshGuard } from "src/lib/guards/refresh.guard";
import { IAccess } from "src/lib/jwt/interfaces/access.interface"; 
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/entry/login.entry.dto"; 
import { LogoutOutputDto } from "./dto/entry/logout.output.dto"; 
import { AuthOutput } from "./dto/output/login.output.dto";

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Post('login')
    @ApiOkResponse({type: AuthOutput})
    @ApiOperation({ summary: 'Sing in session' })
    async login(
        @Body() data: LoginDto
    ){
        const login = await this.authService.login(data);
        return plainToClass(AuthOutput, login, {excludeExtraneousValues:true});
    };

    @Patch('refresh-token')
    @UseGuards(RefreshGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: AuthOutput})
    @ApiOperation({ summary: 'Refresh session' })
    async refresh(
        @Session() session: { id: string },
    ){
        const refresh = await this.authService.refresh(session.id);  
        return plainToClass(AuthOutput, refresh, {excludeExtraneousValues:true});
    };
    @Delete('logout')
    @UseGuards(AccessGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: LogoutOutputDto })
    @ApiOperation({ summary: 'Logout session' })
    public async logout(@Session() payload: IAccess) {
      await this.authService.logout(payload.id);
      return { message: 'Logout Ok' };
    };
};
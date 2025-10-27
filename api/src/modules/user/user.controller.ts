import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Roles } from '../auth/decorators';
import { CreateUserDto, UpdateUserDto, FindUsersQueryDto } from './dto';
import { UserRoleType } from './types';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @UseGuards(RolesGuard)
  @Roles(UserRoleType.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: FindUsersQueryDto) {
    return this.userService.findAll(query);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleType.ADMIN)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleType.ADMIN)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.delete(id);
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findById(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos';

@Auth()
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Auth(ValidRoles.ARTIST)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @GetUser() user: User) {
    return this.eventService.create(createEventDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.eventService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  async create(createEventDto: CreateEventDto, user: User) {
    try {
      const event = this.eventRepository.create({
        ...createEventDto,
        artist: user,
      });
      await this.eventRepository.save(event);
      return event;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const events = await this.eventRepository.find({
        take: limit,
        skip: offset,
      });
      return events;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}

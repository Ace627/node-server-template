import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'
import dayjs from 'dayjs'

import holidays from '@/mock/holidays.json'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/holiday')
  demo(@Query('date') date: string): any {
    if (date) {
      return holidays.find(v => v.date === date) || { date, isHoliday: 0 }
    } else {
      return { list: holidays, total: holidays.length }
    }
  }
}

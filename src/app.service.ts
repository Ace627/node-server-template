import { Injectable } from '@nestjs/common'

/**
 * 业务层，写一些与业务相关的逻辑。比如对数据库的 CRUD 就可以写到这里
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}

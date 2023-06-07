import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'

interface ResponseData<T> {
  data: T
}

@Injectable()
export default class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseData<T>> {
    return next.handle().pipe(map(data => ({ code: 200, msg: '请求成功', data })))
  }
}

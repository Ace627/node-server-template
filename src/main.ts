import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import ExceptionInterceptor from './config/exception.interceptor'
import ResponseInterceptor from './config/response.interceptor'
import { SEVER_PORT, BASE_URL } from './config/deault.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix(BASE_URL)
  // 配置静态资源目录
  app.useStaticAssets('public')
  // 配置全局异常拦截器
  app.useGlobalFilters(new ExceptionInterceptor())
  // 配置全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(SEVER_PORT)
  console.log(`Node Server is running at http://localhost:${SEVER_PORT}${BASE_URL}`)
}
bootstrap()

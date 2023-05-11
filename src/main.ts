import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import ExceptionInterceptor from './config/exception.interceptor'
import ResponseInterceptor from './config/response.interceptor'
import { SEVER_PORT, BASE_URL, API_DOC_URL } from './config/deault.config'
import SwaggerConfig from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix(BASE_URL) // 添加全局路由前缀
  SwaggerConfig(app, '/swagger-api')
  app.useStaticAssets('public') // 配置静态资源目录
  app.useGlobalFilters(new ExceptionInterceptor()) // 配置全局异常拦截器
  app.useGlobalInterceptors(new ResponseInterceptor()) // 配置全局响应拦截器
  await app.listen(SEVER_PORT)
  console.log(`Node Server is running at http://localhost:${SEVER_PORT}${BASE_URL}`)
  console.log(`Swagger Api is running at http://localhost:${SEVER_PORT}${API_DOC_URL}`)
}
bootstrap()

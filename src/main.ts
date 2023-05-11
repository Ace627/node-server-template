import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import ExceptionInterceptor from './config/exception.interceptor'
import ResponseInterceptor from './config/response.interceptor'
import { SEVER_PORT, BASE_URL, API_DOC_URL } from './config/deault.config'
import SwaggerConfig from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.disable('x-powered-by') // 移除 X-Powered-By 响应头，让攻击者更难以看到您的站点可能支持哪些潜在的易受攻击技术点
  app.setGlobalPrefix(BASE_URL) // 添加全局路由前缀
  SwaggerConfig(app, API_DOC_URL)
  app.useStaticAssets('public') // 配置静态资源目录
  app.useGlobalFilters(new ExceptionInterceptor()) // 配置全局异常拦截器
  app.useGlobalInterceptors(new ResponseInterceptor()) // 配置全局响应拦截器
  await app.listen(SEVER_PORT)
  console.log(`Node Server is running at http://localhost:${SEVER_PORT}${BASE_URL}`)
  console.log(`Swagger Api is running at http://localhost:${SEVER_PORT}${API_DOC_URL}`)
}
bootstrap()

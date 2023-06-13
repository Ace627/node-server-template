import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { knife4jSetup } from 'nestjs-knife4j'
import type { NestExpressApplication } from '@nestjs/platform-express'

export default (app: NestExpressApplication, path: string) => {
  const options = new DocumentBuilder()
    .setTitle('Nestjs 服务器模板')
    .setContact('当时只道是寻常', '', '')
    .setDescription('API 文档的描述')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(path, app, document)

  knife4jSetup(app, { urls: [{ name: 'admin api', url: `/${path}-json`, swaggerVersion: '3.0', location: `/${path}-json` }] })
}

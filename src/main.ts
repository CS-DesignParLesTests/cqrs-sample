import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe allows to enforce validation on parameters, with decorators such as "@IsEmail()"
  app.useGlobalPipes(new ValidationPipe());
  // ClassSerializerInterceptor allows to exclude some elements from serialization, such as excluding password from being returned to the client.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('CQRS library project - TDD course')
    .setDescription('The CQRS library API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config); // can be saved as JSON/YAML file
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

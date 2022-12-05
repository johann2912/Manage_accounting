import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Product accounting management')
      .setDescription(
        `This service allows you to count the products of a store, 
        it has a CRUD of products. Creation, listing and deletion 
        of users (as an important note: this project is not focused 
        on demonstrating good user management, it only creates users 
        to be able to authenticate in the different routes used to 
        interact with the store's products)`,
      )
      .setVersion('v1.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/accounting-management/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  };
};
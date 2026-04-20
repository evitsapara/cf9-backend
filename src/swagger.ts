import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';
import mongooseToSwagger from 'mongoose-to-swagger';
import { Express } from 'express';
import User from './models/user.model';
import Role from './models/role.model';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Users Backed API',
            version: '1.0.0',
            description: 'Api for Users, Roles, Authentication',
        },
            servers: [
        {
            url: 'http://localhost:30000/api',
            description: 'Local Server'
        },
        {
            url: "http://xxxx.com/api",
            description: "Render Cloud Server"
        }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            "schemas": {
                "User": mongooseToSwagger(User),
                "Role": mongooseToSwagger(Role)
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);


export const setupSwagger = (app: Express) => {
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
}
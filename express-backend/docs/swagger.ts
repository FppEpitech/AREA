const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API Documentation for my Express App",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            },
        ],
    },
    apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;

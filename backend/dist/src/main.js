"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: config.get("FRONTEND_URL", "http://localhost:3000"),
        credentials: true,
    });
    app.setGlobalPrefix("api");
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: "1" });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableShutdownHooks();
    await app.listen(config.get("PORT", 4000));
}
void bootstrap();
//# sourceMappingURL=main.js.map
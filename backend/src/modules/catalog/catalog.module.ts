import { Module } from "@nestjs/common";
import { CategoriesController, NotificationsController, SearchController } from "./catalog.controller";

@Module({ controllers: [CategoriesController, SearchController, NotificationsController] })
export class CatalogModule {}

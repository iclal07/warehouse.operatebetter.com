import { WarehouseApp } from "./warehouse-app";
import { AppProviders } from "../src/app/providers";

export default function Home() {
  return <AppProviders><WarehouseApp /></AppProviders>;
}

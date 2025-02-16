import { DependencyManager } from "../dependencyManager";
import { httpClientModuleInitialize } from "./httpClient/httpClientModule";
import { processFileModuleInitialize } from "./processFile/processFileModule";

// We can register global services here

const ServicesInitializer = (dependencyManager: DependencyManager) => {
  processFileModuleInitialize(dependencyManager);
  httpClientModuleInitialize(dependencyManager);
};
export default ServicesInitializer;

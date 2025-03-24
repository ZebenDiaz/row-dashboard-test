import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1", // Soporte para alias "~/*"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Configuración adicional
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transforma archivos TypeScript
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/tests/**/*.(test|spec).(ts|tsx)"], // Detecta archivos de prueba
};

export default config;

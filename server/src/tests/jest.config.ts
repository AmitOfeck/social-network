import type { Config } from 'jest';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'], 
  testTimeout: 30000, 
  detectOpenHandles: true, 
  forceExit: true, 
  rootDir: process.cwd(), 
};

export default config;

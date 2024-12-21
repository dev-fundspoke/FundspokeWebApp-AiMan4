import { ErrorSeverity } from '../utils/logger';

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  component?: string;
  type?: string;
  context?: Record<string, unknown>;
}

export interface ErrorLogOptions {
  severity?: ErrorSeverity;
  component?: string;
  context?: Record<string, unknown>;
}

export interface ErrorStorageService {
  save(entry: ErrorLogEntry): void;
  getAll(): ErrorLogEntry[];
  clear(): void;
}
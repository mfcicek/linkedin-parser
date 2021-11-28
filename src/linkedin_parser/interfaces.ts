export interface ScraperUserDefinedOptions {
  sessionCookieValue: string;
  keepAlive?: boolean;
  userAgent?: string;
  timeout?: number;
  headless?: boolean;
}

export interface ScraperOptions {
  sessionCookieValue: string;
  keepAlive: boolean;
  userAgent: string;
  timeout: number;
  headless: boolean;
}

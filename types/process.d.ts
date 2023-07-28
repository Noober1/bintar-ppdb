declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    CAPTCHA_SITE_KEY: string;
    CAPTCHA_SECRET_KEY: string;
    CAPTCHA_SITE_URL: string;
  }
}

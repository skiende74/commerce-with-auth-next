declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_BASE_URL:string

        DB_PROJECT_ID:string
        DB_PROJECT_URL:string
        DB_ANON_KEY:string
        JWT_PRIVATE_KEY:string
    }
}
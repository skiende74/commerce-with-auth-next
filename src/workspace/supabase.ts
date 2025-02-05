import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.DB_PROJECT_URL, process.env.DB_ANON_KEY);

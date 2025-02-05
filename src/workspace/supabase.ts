import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export const supabase = createClient<Database>(process.env.DB_PROJECT_URL, process.env.DB_ANON_KEY);

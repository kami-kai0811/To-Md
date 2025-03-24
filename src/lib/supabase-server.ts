import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = env.SUPABASE_STORAGE_URL!;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

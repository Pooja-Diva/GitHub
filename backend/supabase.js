const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://zwoyphfxcsuzjymsjidf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3b3lwaGZ4Y3N1emp5bXNqaWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NDgxNzQsImV4cCI6MjA2ODEyNDE3NH0.dB2acm1FxyRqextI9oOQOFRJ7CYnlspFsfZTFqkB2LM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ajtbgaoittxdpfvqkniu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdGJnYW9pdHR4ZHBmdnFrbml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1OTk2NTcsImV4cCI6MjAxMjE3NTY1N30.0xqLfRIcjMTxgQPw_ElgdjhQWlba5kKMRgQL-tcha14';

export const supabase = createClient(supabaseUrl, supabaseKey);
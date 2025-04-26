import { Pool } from "pg";

let globalPool: Pool | undefined;

export async function getDb() {
  if (globalPool) {
    console.log("Reusing existing PostgreSQL pool: true");
    return globalPool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  globalPool = new Pool({
    connectionString,
  });

  const client = await globalPool.connect();
  try {
    await client.query("SELECT NOW()");
    console.log(`Successfully connected to Supabase with connectionString: ${connectionString}`);
  } finally {
    client.release();
  }

  // Handle pool errors
  globalPool.on("error", (err) => {
    console.error("Unexpected error on PostgreSQL pool:", err);
    globalPool = undefined; // Reset pool to allow reinitialization
  });

  return globalPool;
}
import { User } from "@/types/user";
import { getDb } from "./db";

export async function insertUser(user: User) {
  const createdAt: string = new Date().toISOString();
  const db = await getDb();

  try {
    const isEmailExist = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [user.email]
    );

    if (isEmailExist.rows.length > 0) {
      throw new Error(`User with email ${user.email} already exists`);
    }

    const res = await db.query(
      `INSERT INTO users 
            (email, nickname, avatar_url, created_at) 
            VALUES 
            ($1, $2, $3, $4)
        `,
      [user.email, user.nickname, user.avatar_url, createdAt]
    );

    return res.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}

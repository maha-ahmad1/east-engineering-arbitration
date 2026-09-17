/**
 * Baserow row-create client. SERVER ONLY — it reads the database token, which
 * must never reach the browser.
 */

import "server-only";

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  caseType?: string;
  details: string;
};

/** Field names must match the columns in the Baserow table. */
type BaserowRow = {
  الاسم: string;
  الجوال: string;
  البريد: string;
  "نوع النزاع": string;
  "ملخص النزاع": string;
  المصدر: string;
};

export async function createLead(lead: Lead): Promise<void> {
  const token = process.env.BASEROW_TOKEN;
  const tableId = process.env.BASEROW_TABLE_ID;
  const host = process.env.BASEROW_API_URL ?? "https://api.baserow.io";

  if (!token || !tableId) {
    throw new Error("BASEROW_TOKEN / BASEROW_TABLE_ID are not configured.");
  }

  const row: BaserowRow = {
    الاسم: lead.name,
    الجوال: lead.phone,
    البريد: lead.email ?? "",
    "نوع النزاع": lead.caseType ?? "",
    "ملخص النزاع": lead.details,
    المصدر: "صفحة التحكيم الهندسي",
  };

  const res = await fetch(
    `${host}/api/database/rows/table/${tableId}/?user_field_names=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Baserow responded ${res.status}: ${body.slice(0, 500)}`);
  }
}

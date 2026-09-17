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
  name: string;
  phone: string;
  email: string;
  /**
   * A single-select field. Baserow rejects "" with
   * ERROR_REQUEST_BODY_VALIDATION, so an unanswered dropdown must be sent as
   * null. The allowed values are the 8 labels in `caseTypes` in lib/content.ts
   * — they must stay identical to the select options on the table.
   */
  caseType: string | null;
  details: string;
};

export async function createLead(lead: Lead): Promise<void> {
  const token = process.env.BASEROW_TOKEN;
  const tableId = process.env.BASEROW_TABLE_ID;
  // Self-hosted Baserow, so the host is required rather than defaulted.
  const host = process.env.BASEROW_API_URL;

  if (!token || !tableId || !host) {
    throw new Error(
      "BASEROW_TOKEN / BASEROW_TABLE_ID / BASEROW_API_URL are not configured.",
    );
  }

  const row: BaserowRow = {
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? "",
    caseType: lead.caseType?.trim() ? lead.caseType : null,
    details: lead.details,
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

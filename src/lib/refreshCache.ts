// src/lib/actions.js
"use server";

import { revalidateTag } from "next/cache";

export async function refreshBooking(tag: string) {
    revalidateTag(tag, 'default');
}
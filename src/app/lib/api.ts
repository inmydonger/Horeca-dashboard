import { projectId, publicAnonKey } from '../../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-933d25e4`;
const API_PREFIX = `${BASE_URL}/api/kv`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
};

export async function kvGet(key: string) {
  const res = await fetch(`${API_PREFIX}/${encodeURIComponent(key)}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.data;
}

export async function kvGetByPrefix(prefix: string) {
  const res = await fetch(`${API_PREFIX}/prefix/${encodeURIComponent(prefix)}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.data;
}

export async function kvSet(key: string, value: any) {
  const res = await fetch(`${API_PREFIX}/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(value)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function kvDelete(key: string) {
  const res = await fetch(`${API_PREFIX}/${encodeURIComponent(key)}`, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

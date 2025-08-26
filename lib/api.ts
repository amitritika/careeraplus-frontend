export const API_BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE) || 'http://localhost:8000';

type FetchOpts = RequestInit & { json?: any };

export async function apiFetch<T = any>(path: string, opts: FetchOpts = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const { json, headers, body, ...rest } = opts;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const finalHeaders: Record<string, string> = { ...(headers as any) };
  if (json) {
    finalHeaders['Content-Type'] = 'application/json';
    finalHeaders['Accept'] = 'application/json';
  }
  // IMPORTANT: don't set Content-Type for FormData

  const res = await fetch(url, {
    credentials: 'include',
    headers: finalHeaders,
    body: json ? JSON.stringify(json) : (body as any),
    method: opts.method || (json ? 'POST' : 'GET'),
    ...rest,
  });

  const ctype = res.headers.get('content-type') || '';
  const isJSON = ctype.includes('application/json');
  const data = res.status === 204 ? null : isJSON ? await res.json() : await res.text();

  if (!res.ok) {
    const message = (isJSON && (data as any)?.error) || (isJSON && (data as any)?.message) || res.statusText;
    throw new Error(message || `Request failed: ${res.status}`);
  }
  return data as T;
}

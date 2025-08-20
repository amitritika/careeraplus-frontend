export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

type FetchOpts = RequestInit & { json?: any };

export async function apiFetch<T = any>(path: string, opts: FetchOpts = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const { json, headers, ...rest } = opts;
  const res = await fetch(url, {
    credentials: 'include', // send cookies
    headers: {
      'Content-Type': json ? 'application/json' : (headers as any)?.['Content-Type'],
      ...(headers || {}),
    },
    body: json ? JSON.stringify(json) : (opts.body as any),
    method: opts.method || (json ? 'POST' : 'GET'),
    ...rest,
  } as RequestInit);

  const isJSON = res.headers.get('content-type')?.includes('application/json');
  const data = isJSON ? await res.json() : (await res.text());

  if (!res.ok) {
    const message = (isJSON && (data as any)?.error) || res.statusText;
    throw new Error(message || `Request failed: ${res.status}`);
  }
  return data as T;
}

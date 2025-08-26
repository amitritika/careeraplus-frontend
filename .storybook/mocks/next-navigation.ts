export type MockRouter = {
  push: (url: string) => void;
  replace: (url: string) => void;
  prefetch: (url: string) => Promise<void>;
  back: () => void;
  forward: () => void;
  refresh: () => void;
};

const router: MockRouter = {
  push: (url) => console.log('[router.push]', url),
  replace: (url) => console.log('[router.replace]', url),
  prefetch: async () => {},
  back: () => console.log('[router.back]'),
  forward: () => console.log('[router.forward]'),
  refresh: () => console.log('[router.refresh]'),
};

export const useRouter = () => router;
export const usePathname = () => '/';
export const useSearchParams = () =>
  new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
export const useSelectedLayoutSegments = () => [];
export const useSelectedLayoutSegment = () => null;

const UNICORN_SDK_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js';

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

let unicornLoadPromise: Promise<void> | null = null;

export function loadUnicornStudio(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (window.UnicornStudio?.init) {
    return Promise.resolve();
  }

  if (unicornLoadPromise) {
    return unicornLoadPromise;
  }

  unicornLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${UNICORN_SDK_SRC}"]`,
    );

    const onReady = () => resolve();

    if (existingScript) {
      if (window.UnicornStudio?.init) {
        resolve();
        return;
      }

      existingScript.addEventListener('load', onReady, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Unicorn Studio SDK')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = UNICORN_SDK_SRC;
    script.async = true;
    script.addEventListener('load', onReady, { once: true });
    script.addEventListener('error', () => reject(new Error('Failed to load Unicorn Studio SDK')), {
      once: true,
    });
    document.head.appendChild(script);
  });

  return unicornLoadPromise;
}

export async function initializeUnicornStudio(): Promise<void> {
  await loadUnicornStudio();
  window.UnicornStudio?.init?.();
}

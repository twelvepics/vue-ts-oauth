export const loadScript = (src: string) => {
  // eslint-disable-line no-param-reassign
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="' + src + '"]')) {
      resolve();
      return;
    }
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = src;
    el.addEventListener('load', resolve);
    el.addEventListener('error', reject);
    el.addEventListener('abort', reject);
    document.head.appendChild(el);
  });
};

export const unloadScript = (src: string) => {
  // eslint-disable-line no-param-reassign
  return new Promise((resolve, reject) => {
    const el = document.querySelector('script[src="' + src + '"]');
    if (!el) {
      reject();
      return;
    }
    document.head.removeChild(el);
    resolve();
  });
};

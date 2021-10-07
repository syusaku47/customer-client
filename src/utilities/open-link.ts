/**
 * 外部リンクを開く
 * @param url URL
 */
export const openLink = (url: string | undefined) => {
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const openLineMessage = (text:string) => openLink(`https://line.me/R/share?text=${encodeURI(text)}`);
export const openFacebook = (id:string) => openLink(`https://www.facebook.com/${id}`);
export const openTwitter = (id:string) => openLink(`https://twitter.com/${id}`);
export const openInstagram = (id:string) => openLink(`https://www.instagram.com/${id}`);

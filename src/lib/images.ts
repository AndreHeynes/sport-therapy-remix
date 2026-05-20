export const getDisplayImageUrl = (image?: string | null) => {
  if (!image) return null;

  if (image.startsWith('http')) return image;
  if (image.startsWith('/')) return image;

  return `/${image}`;
};

export const getAbsoluteImageUrl = (image?: string | null, siteUrl = 'https://sportandbodyterapia.org') => {
  if (!image) return undefined;

  if (image.startsWith('http')) return image;

  return `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;
};
function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch (e) {
    return false;
  }
}

function getMimeType(base64: string): string | null {
  const mimeTypes: { [key: string]: string } = {
    '/9j/': 'image/jpeg',
    iVBORw0KGgo: 'image/png',
    R0lGODdh: 'image/gif',
  };

  for (const prefix in mimeTypes) {
    if (base64.startsWith(prefix)) {
      return mimeTypes[prefix];
    }
  }

  return null;
}

export function getBase64ImageString(base64?: string): string {
  if (!base64) {
    return '';
  }
  if (!isValidBase64(base64)) {
    return base64;
  }

  const mimeType = getMimeType(base64);

  if (!mimeType) {
    return 'Unknown MIME type';
  }

  return `data:${mimeType};base64,${base64}`;
}

export function getSiteUrl(): URL {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;

  if (explicit) {
    const withProtocol = explicit.startsWith("http")
      ? explicit
      : `https://${explicit}`;
    return new URL(withProtocol);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return new URL(`https://${vercelUrl}`);

  return new URL("http://localhost:3000");
}


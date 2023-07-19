export async function ensureDir(pathname: string) {
  const stat = await Deno.stat(pathname).catch(() => null);

  if (!stat) {
    await Deno.mkdir(pathname, { recursive: true });
  }
}

import Home from "../components/Home";
import { getShell, getTrending } from "../sanity/fetch";

export const revalidate = 60;

export default async function Page() {
  const [shell, trending] = await Promise.all([getShell(), getTrending()]);
  return (
    <Home
      content={shell.content}
      spaces={shell.spaces}
      feed={shell.searchIndex}
      trending={trending}
    />
  );
}

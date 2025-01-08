import { getStore } from "@netlify/blobs";
import { ChangelogEntry } from "@/types/entry";

export async function saveEntry(entry: ChangelogEntry) {
  const store = getStore("changelog-store");
  await store.setJSON(entry.id.toString(), entry);
}

export async function getAllEntries(): Promise<ChangelogEntry[]> {
  const store = getStore("changelog-store");
  const list = await store.list();

  const entries = await Promise.all(
    list.blobs.map(async (item) => {
      const entry = (await store.get(item.key, {
        type: "json",
      })) as ChangelogEntry;
      return entry;
    }),
  );

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

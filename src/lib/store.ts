import { getStore } from "@netlify/blobs";
import { ChangelogEntry } from "@/types/entry";

// Mock data for development/build
const MOCK_ENTRIES: ChangelogEntry[] = [
  {
    id: 1,
    title: "Example Entry",
    description:
      "This is a placeholder entry for development and build environments.",
    date: new Date().toISOString(),
    metadata: {
      sourceRepo: "open-telemetry/community",
      state: "merged",
      url: "https://github.com/open-telemetry/community",
      author: "example-user",
    },
  },
];

export async function saveEntry(entry: ChangelogEntry) {
  try {
    const store = getStore("changelog-store");
    await store.setJSON(entry.id.toString(), entry);
  } catch (error) {
    console.warn("Failed to save entry:", error);
    // In development/build, just log the entry
    console.log("Would have saved:", entry);
  }
}

export async function getAllEntries(): Promise<ChangelogEntry[]> {
  try {
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
  } catch (error) {
    console.warn("Failed to get entries:", error);
    // Return mock data in development/build
    return MOCK_ENTRIES;
  }
}

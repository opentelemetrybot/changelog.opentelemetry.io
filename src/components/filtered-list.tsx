"use client";

import { useState } from "react";
import { ChangelogEntry } from "@/types/entry";
import { ChangelogDescription } from "./changelog-description";
import { GitHubUsername } from "./github-username";

export function FilteredList({ entries }: { entries: ChangelogEntry[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const itemsPerPage = 10;
  const repositories = Array.from(
    new Set<string>(entries.map((entry) => entry.metadata.sourceRepo)),
  );

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const stateMatch =
      stateFilter === "all" || entry.metadata.state === stateFilter;
    const sourceMatch =
      sourceFilter === "all" || entry.metadata.sourceRepo === sourceFilter;
    return stateMatch && sourceMatch;
  });

  // Paginate entries
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="flex gap-4 mb-4">
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-700 p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        >
          <option value="all">All States</option>
          <option value="opened">Opened</option>
          <option value="merged">Merged</option>
          <option value="released">Released</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-700 p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        >
          <option value="all">All Repositories</option>
          {repositories.map((repo) => (
            <option key={repo} value={repo}>
              {repo}
            </option>
          ))}
        </select>
      </div>

      {paginatedEntries.map((entry) => (
        <article
          key={entry.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 mb-6 last:mb-0 border border-gray-100 dark:border-gray-700"
        >
          <h1 className="text-lg font-medium leading-tight">
            <a
              href={entry.metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-900 dark:text-white"
            >
              {entry.title}
            </a>
          </h1>
          <div className="mt-2">
            <ChangelogDescription
              description={entry.description}
              repoFullName={entry.metadata.sourceRepo}
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-3">
            <time>{new Date(entry.date).toLocaleDateString()}</time>
            <span>{entry.metadata.sourceRepo}</span>
            <span className="capitalize">{entry.metadata.state}</span>
            <span>
              By <GitHubUsername username={entry.metadata.author} />
            </span>
          </div>
        </article>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

import { getAllEntries } from "@/lib/store";
import { ChangelogList } from "@/components/list";

export const revalidate = 60;

export default async function Home() {
  const entries = await getAllEntries();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            OpenTelemetry Changelog
          </h1>
          <div className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto space-y-4">
            <p>
              This site tracks pull requests to the OpenTelemetry Specification,
              Semantic Conventions, and Proto Definitions. The following items
              are tracked:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-left">
              <li>Non-trivial specification changes and releases.</li>
              <li>
                New semantic convention areas or stability changes, as well as
                releases.
              </li>
              <li>Updates and releases of the protos.</li>
            </ul>
            <p>
              The goal of this site is to give maintainers a single reference
              for important cross-functional changes.
            </p>
            <hr className="my-4" />
            <p>
              To add a Pull Request to this feed, label it with{" "}
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                changelog.opentelemetry.io
              </code>
            </p>
          </div>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 p-6 sm:p-8">
          <div className="prose dark:prose-invert max-w-none">
            <ChangelogList entries={entries} />
          </div>
        </main>

        <footer className="mt-16 text-center">
          <div className="space-x-6">
            <a
              href="/feed/"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
                <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z" />
                <path d="M3 15a2 2 0 114 0 2 2 0 01-4 0z" />
              </svg>
              RSS Feed
            </a>
            <a
              href="https://github.com/open-telemetry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

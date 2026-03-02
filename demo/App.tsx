import React from "react";
import RemoteStorage from "remotestoragejs";
import { DefaultWidget } from "../src/DefaultWidget";
import { LoginButtons } from "../src/LoginButtons";

const API_KEYS = {
  dropbox: "6sa61p53d6qa88q",
  googledrive:
    "626692989184-4qj0epv5gcra69l8kvv3aj6nnahq7rrk.apps.googleusercontent.com",
};

function makeRS() {
  const rs = new RemoteStorage();
  rs.setApiKeys(API_KEYS);
  rs.access.claim("bookmarks", "rw");
  rs.caching.enable("/bookmarks/");
  return rs;
}

// Create separate instances so widgets don't interfere with each other
const rs1 = makeRS();
const rs2 = makeRS();

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">RemoteStorage Widget</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">
          Two variants: a collapsible floating widget and an inline login flow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* ── DefaultWidget ──────────────────────────────────────────── */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
              DefaultWidget
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Collapsible floating widget. Starts collapsed to an icon, expands
              on click.
            </p>
            <DefaultWidget rs={rs1} leaveOpen />
          </section>

          {/* ── LoginButtons ───────────────────────────────────────────── */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
              LoginButtons
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Inline provider buttons — no icon, no collapsing. Embed directly
              in a sidebar or settings panel.
            </p>
            <div className="max-w-xs">
              <LoginButtons rs={rs2} />
            </div>
          </section>
        </div>

        <hr className="my-16 border-gray-200 dark:border-gray-800" />

        <section className="max-w-xl">
          <h2 className="text-lg font-semibold mb-4">Usage</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
            <code>{`import { DefaultWidget } from 'remotestorage-widget'
import { LoginButtons } from 'remotestorage-widget'

// Floating collapsible widget
<DefaultWidget rs={rs} />

// Inline provider buttons
<LoginButtons rs={rs} />`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}

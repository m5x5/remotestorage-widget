/**
 * DefaultWidget — pre-styled remotestorage-widget built with Tailwind CSS.
 *
 * This is the shadcn-style "installable default": copy this file into your
 * project and customise freely, or import it directly as-is.
 *
 * Requires Tailwind CSS v4 in the consumer project. Add this package to your
 * Tailwind content config so JIT picks up the class names:
 *   content: ["./node_modules/remotestorage-widget/src/**\/*.ts", "...tsx"]
 *
 * Usage:
 *   import { DefaultWidget } from 'remotestorage-widget';
 *   <DefaultWidget rs={remoteStorage} />
 */
import React from "react";
import { useRSWidget, RemoteStorageWidget as RSW } from "./RemoteStorageWidget";
import type { RootProps } from "./RemoteStorageWidget";

// ─── SVG icons (inlined for zero extra imports) ───────────────────────────────

function RemoteStorageLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 739 853"
      aria-hidden="true"
    >
      <path
        d="M370 754 0 542v98l185 107 185 106 184-106 185-107V378l-86 49-283 162L86 427v-66l99 57 185 106 184-106 99-57 86-50v-98L554 107 370 0 185 107 58 180l86 50 84-49 142-81 141 81 141 82-282 162L87 263 0 213v263l86 49 99 57 185 107 184-107 99-57v67z"
        fill="#FF4B03"
      />
    </svg>
  );
}

function DropboxLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M8 2.4l8 5.1-8 5.1-8-5.1 8-5.1zm16 0l8 5.1-8 5.1-8-5.1 8-5.1zM0 17.7l8-5.1 8 5.1-8 5.1-8-5.1zm24-5.1l8 5.1-8 5.1-8-5.1 8-5.1zM8 24.5l8-5.1 8 5.1-8 5.1-8-5.1z"
        fill="#0061FE"
      />
    </svg>
  );
}

function GoogleDriveLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 87.3 78" aria-hidden="true">
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066DA"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z"
        fill="#00AC47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 11.5z"
        fill="#EA4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832D"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684FC"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#FFBA00"
      />
    </svg>
  );
}

function SyncIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
}

function PowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 6a7.75 7.75 0 1 0 10 0" />
      <path d="M12 4v8" />
    </svg>
  );
}

function WarningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function SpinnerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      aria-hidden="true"
    >
      <g fill="none">
        <g strokeWidth="2">
          <circle strokeOpacity=".35" cx="19" cy="19" r="18" />
          <path d="M37 19C37 9.06 28.94 1 19 1" />
        </g>
      </g>
    </svg>
  );
}

// ─── Main logo (switches based on active backend) ─────────────────────────────

function BackendLogo() {
  const { state } = useRSWidget();
  const logoClass = "size-9 shrink-0 mr-2.5";

  if (state.backend === "dropbox") return <DropboxLogo className={logoClass} />;
  if (state.backend === "googledrive") return <GoogleDriveLogo className={logoClass} />;
  return (
    <RemoteStorageLogo
      className={`${logoClass} transition-[fill] duration-500 ${
        !state.online && state.active ? "[&_path]:fill-gray-400" : ""
      }`}
    />
  );
}

// ─── Default widget composition ───────────────────────────────────────────────

function WidgetContent() {
  const { state, actions, rs } = useRSWidget();

  return (
    <div
      className={[
        // Base container
        "relative font-sans text-[16px] box-border overflow-hidden",
        "max-w-[350px] p-2.5 m-2.5 rounded-lg",
        "bg-white dark:bg-black",
        "border border-gray-200 dark:border-gray-800",
        "text-black dark:text-white",
        "transition-[width,max-width,max-height,background,box-shadow,opacity] duration-300",
        // Closed state — icon only
        state.closed
          ? "max-w-[56px] bg-transparent! border-transparent shadow-none opacity-50 hover:opacity-100 hover:cursor-pointer"
          : "",
        // Offline tint
        !state.online && state.active ? "rs-offline" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Widget icon ──────────────────────────────────────────────── */}
      <RSW.Icon className="cursor-pointer">
        <BackendLogo />
      </RSW.Icon>

      {/* ── Initial panel: "Connect your storage" hint ───────────────── */}
      <RSW.InitialView className="cursor-pointer transition-opacity duration-300 delay-300">
        <h3 className="text-[1em] font-semibold m-0 mb-0.5 leading-tight truncate">
          Connect your storage
        </h3>
        <span className="text-[0.92em] text-gray-500 dark:text-gray-400 truncate">
          To sync data with your account
        </span>
      </RSW.InitialView>

      {/* ── Connected panel ──────────────────────────────────────────── */}
      <RSW.ConnectedView className="flex flex-row items-center h-10">
        <div className="flex-1 min-w-0">
          <p className="text-[1em] font-semibold m-0 mb-0.5 truncate">
            {state.user}
          </p>
          <span className="text-[0.92em] text-gray-500 dark:text-gray-400 truncate block">
            {state.statusText}
          </span>
        </div>
        <div className="flex shrink-0 gap-1 ml-1">
          {state.syncEnabled && (
            <RSW.SyncButton
              title="Sync now"
              className={[
                "p-1.5 rounded border cursor-pointer bg-transparent text-inherit",
                "transition-[border-color,color] duration-200",
                "border-gray-300 dark:border-gray-700",
                "hover:border-amber-400 hover:text-amber-400",
                state.syncing ? "border-amber-400 text-amber-400" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <SyncIcon
                className={state.syncing ? "animate-spin" : ""}
              />
            </RSW.SyncButton>
          )}
          <RSW.DisconnectButton
            title="Disconnect"
            className="p-1.5 rounded border cursor-pointer bg-transparent text-inherit border-gray-300 dark:border-gray-700 hover:border-red-500 hover:text-red-500 transition-[border-color,color] duration-200"
          >
            <PowerIcon />
          </RSW.DisconnectButton>
        </div>
      </RSW.ConnectedView>

      {/* ── Error panel ──────────────────────────────────────────────── */}
      <RSW.ErrorView className="flex flex-col gap-2.5">
        <div className="flex items-start gap-2">
          <WarningIcon className="size-4 text-red-500 dark:text-red-400 shrink-0 mt-px" />
          <p className="m-0 text-sm text-red-700 dark:text-red-400 leading-snug break-all">
            {state.errorMessage}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => actions.showChooseOrSignIn()}
            className="text-sm px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent shadow-xs font-[inherit] cursor-pointer text-inherit hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150"
          >
            Try again
          </button>
          <RSW.ReconnectButton className="text-sm px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent shadow-xs font-[inherit] cursor-pointer text-inherit hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150" />
          <RSW.DisconnectButton
            title="Disconnect"
            className="ml-auto p-1.5 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent shadow-xs cursor-pointer text-inherit hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 transition-colors duration-150"
          >
            <PowerIcon />
          </RSW.DisconnectButton>
        </div>
      </RSW.ErrorView>

      {/* ── Choose provider panel ─────────────────────────────────────── */}
      <RSW.ChooseView className="w-full text-center">
        <div className="px-2.5 pb-2.5">
          <RemoteStorageLogo className="size-9 mx-auto mb-0 block" />
          <h1 className="text-[1.625em] font-normal text-center my-5">
            Connect your storage
          </h1>
          <p className="mt-0 mb-5 text-[0.9em] leading-snug text-left">
            This app lets you sync data with a{" "}
            <a
              href="https://remotestorage.io/"
              target="_blank"
              rel="noopener"
              className="text-blue-500 hover:underline"
            >
              storage provider of your choice
            </a>
            .
          </p>
          <div className="flex flex-col gap-2">
            <ProviderButton
              onClick={() => actions.showSignIn()}
              label="RemoteStorage"
            >
              <RemoteStorageLogo className="size-7 shrink-0" />
            </ProviderButton>
            {rs.dropbox && (
              <ProviderButton
                onClick={() => rs.dropbox?.connect()}
                label="Dropbox"
              >
                <DropboxLogo className="size-7 shrink-0" />
              </ProviderButton>
            )}
            {rs.googledrive && (
              <ProviderButton
                onClick={() => rs.googledrive?.connect()}
                label="Google Drive"
              >
                <GoogleDriveLogo className="size-7 shrink-0" />
              </ProviderButton>
            )}
          </div>
        </div>
      </RSW.ChooseView>

      {/* ── Sign-in panel ─────────────────────────────────────────────── */}
      <RSW.SignInView className="w-full">
        <div className="px-2.5 pb-2.5">
          <RemoteStorageLogo className="size-9 mx-auto mb-0 block" />
          <h1 className="text-[1.625em] font-normal text-center my-5">
            Connect your storage
          </h1>
          <RSW.ConnectForm
            className="flex flex-col gap-0"
            labelProps={{
              className: "mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-400",
            }}
            inputProps={{
              className:
                "px-3 py-4 w-full font-[inherit] h-[52px] border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-900 text-inherit outline-none focus:ring-2 focus:ring-blue-400",
            }}
            buttonProps={{
              className:
                "mt-5 mb-4 py-4 w-full rounded bg-[#3fb34f] text-black font-[inherit] border-none cursor-pointer hover:bg-[#4bcb5d] hover:shadow-md transition-[background-color,box-shadow] duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed",
            }}
            buttonContent={
              state.connecting ? (
                <span className="flex items-center justify-center gap-2">
                  Connecting
                  <SpinnerIcon className="size-4 animate-spin" />
                </span>
              ) : (
                "Connect"
              )
            }
          >
            <a
              href="https://remotestorage.io/get/"
              className="text-[0.9em] text-blue-500 hover:underline text-center block"
              target="_blank"
              rel="noopener"
            >
              Need help?
            </a>
          </RSW.ConnectForm>
        </div>
      </RSW.SignInView>
    </div>
  );
}

function ProviderButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2.5 px-3 py-2 w-full text-left font-[inherit] text-inherit bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-md shadow-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-150 appearance-none"
    >
      {children}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export type DefaultWidgetProps = Omit<RootProps, "children">;

/**
 * Ready-to-use remotestorage-widget styled with Tailwind CSS.
 *
 * @example
 * ```tsx
 * import { DefaultWidget } from 'remotestorage-widget';
 * const rs = new RemoteStorage();
 * <DefaultWidget rs={rs} />
 * ```
 */
export function DefaultWidget(props: DefaultWidgetProps) {
  return (
    <RSW.Root {...props}>
      <WidgetContent />
    </RSW.Root>
  );
}

export default DefaultWidget;

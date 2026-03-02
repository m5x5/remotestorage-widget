/**
 * LoginButtons — inline provider selection + sign-in flow.
 *
 * Skips the "Connect your storage" hint and shows provider buttons immediately.
 * Use this when you want to embed the login flow directly in a page/sidebar
 * rather than as a floating collapsible widget.
 *
 * @example
 * ```tsx
 * import { LoginButtons } from 'remotestorage-widget';
 * <LoginButtons rs={remoteStorage} />
 * ```
 */
import React from "react";
import { useRSWidget, RemoteStorageWidget as RSW } from "./RemoteStorageWidget";
import type { RootProps } from "./RemoteStorageWidget";

// ─── Icons ────────────────────────────────────────────────────────────────────

function RemoteStorageLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 739 853" aria-hidden="true">
      <path d="M370 754 0 542v98l185 107 185 106 184-106 185-107V378l-86 49-283 162L86 427v-66l99 57 185 106 184-106 99-57 86-50v-98L554 107 370 0 185 107 58 180l86 50 84-49 142-81 141 81 141 82-282 162L87 263 0 213v263l86 49 99 57 185 107 184-107 99-57v67z" fill="#FF4B03" />
    </svg>
  );
}

function DropboxLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 2.4l8 5.1-8 5.1-8-5.1 8-5.1zm16 0l8 5.1-8 5.1-8-5.1 8-5.1zM0 17.7l8-5.1 8 5.1-8 5.1-8-5.1zm24-5.1l8 5.1-8 5.1-8-5.1 8-5.1zM8 24.5l8-5.1 8 5.1-8 5.1-8-5.1z" fill="#0061FE" />
    </svg>
  );
}

function GoogleDriveLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 87.3 78" aria-hidden="true">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA" />
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00AC47" />
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 11.5z" fill="#EA4335" />
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832D" />
      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684FC" />
      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#FFBA00" />
    </svg>
  );
}

function SyncIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
}

function PowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 6a7.75 7.75 0 1 0 10 0" />
      <path d="M12 4v8" />
    </svg>
  );
}

function WarningIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function SpinnerIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" aria-hidden="true">
      <g fill="none"><g strokeWidth="2">
        <circle strokeOpacity=".35" cx="19" cy="19" r="18" />
        <path d="M37 19C37 9.06 28.94 1 19 1" />
      </g></g>
    </svg>
  );
}

// ─── Inner content (uses context from Root) ───────────────────────────────────

function LoginButtonsContent() {
  const { state, actions, rs } = useRSWidget();

  return (
    <div className="font-sans text-[16px]" onClick={(e) => e.stopPropagation()}>

      {/* ── Provider selection ─────────────────────────────────────── */}
      <RSW.ChooseView className="flex flex-col gap-2">
        <ProviderBtn
          logo={<RemoteStorageLogo className="size-7 shrink-0" />}
          label="RemoteStorage"
          onClick={() => actions.showSignIn()}
        />
        {rs.dropbox && (
          <ProviderBtn
            logo={<DropboxLogo className="size-7 shrink-0" />}
            label="Dropbox"
            onClick={() => rs.dropbox?.connect()}
          />
        )}
        {rs.googledrive && (
          <ProviderBtn
            logo={<GoogleDriveLogo className="size-7 shrink-0" />}
            label="Google Drive"
            onClick={() => rs.googledrive?.connect()}
          />
        )}
      </RSW.ChooseView>

      {/* ── RemoteStorage sign-in form ──────────────────────────────── */}
      <RSW.SignInView>
        <button
          type="button"
          onClick={() => actions.showChoose()}
          className="inline-flex items-center gap-1 mb-4 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 bg-transparent border-none cursor-pointer p-0 font-[inherit] transition-colors duration-150"
        >
          ← Back
        </button>
        <RSW.ConnectForm
          className="flex flex-col gap-0"
          labelProps={{
            className: "mb-1.5 text-sm font-medium text-gray-600 dark:text-gray-400",
          }}
          inputProps={{
            className:
              "px-3 py-4 w-full font-[inherit] h-[52px] border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 text-inherit outline-none focus:ring-2 focus:ring-blue-400 box-border",
          }}
          buttonProps={{
            className:
              "mt-4 mb-3 py-4 w-full rounded-lg bg-[#3fb34f] text-black font-[inherit] border-none cursor-pointer hover:bg-[#4bcb5d] hover:shadow-md transition-[background-color,box-shadow] duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed",
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
          {state.discoveryError && (
            <p role="alert" className="mt-2 mb-1 px-2 py-1.5 text-sm text-center bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded">
              {state.discoveryError}
            </p>
          )}
          <a
            href="https://remotestorage.io/get/"
            className="block text-center text-sm text-blue-500 hover:underline"
            target="_blank"
            rel="noopener"
          >
            Need help?
          </a>
        </RSW.ConnectForm>
      </RSW.SignInView>

      {/* ── Connected state ─────────────────────────────────────────── */}
      <RSW.ConnectedView className="flex items-center gap-3">
        <BackendLogoSmall backend={state.backend} online={state.online} />
        <div className="flex-1 min-w-0">
          <p className="m-0 mb-0.5 font-semibold text-[1em] truncate">{state.user}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">{state.statusText}</span>
        </div>
        <div className="flex gap-1 shrink-0">
          {state.syncEnabled && (
            <RSW.SyncButton
              title="Sync now"
              className={[
                "p-1.5 flex items-center rounded border cursor-pointer bg-transparent text-inherit",
                "transition-[border-color,color] duration-200",
                "border-gray-300 dark:border-gray-700",
                "hover:border-amber-400 hover:text-amber-400",
                state.syncing ? "border-amber-400 text-amber-400" : "",
              ].filter(Boolean).join(" ")}
            >
              <SyncIcon className={state.syncing ? "animate-spin" : ""} />
            </RSW.SyncButton>
          )}
          <RSW.DisconnectButton
            title="Disconnect"
            className="p-1.5 flex items-center rounded border cursor-pointer bg-transparent text-inherit border-gray-300 dark:border-gray-700 hover:border-red-500 hover:text-red-500 transition-[border-color,color] duration-200"
          >
            <PowerIcon />
          </RSW.DisconnectButton>
        </div>
      </RSW.ConnectedView>

      {/* ── Error state ─────────────────────────────────────────────── */}
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
            className="ml-auto p-1.5 flex items-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent shadow-xs cursor-pointer text-inherit hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 transition-colors duration-150"
          >
            <PowerIcon />
          </RSW.DisconnectButton>
        </div>
      </RSW.ErrorView>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ProviderBtn({
  logo,
  label,
  onClick,
}: {
  logo: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2.5 px-3 py-2 w-full text-left font-[inherit] text-inherit bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-md shadow-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-150 appearance-none"
    >
      {logo}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function BackendLogoSmall({
  backend,
  online,
}: {
  backend: string | null;
  online: boolean;
}) {
  const cls = `size-8 shrink-0 transition-opacity duration-500 ${!online ? "opacity-40" : ""}`;
  if (backend === "dropbox") return <DropboxLogo className={cls} />;
  if (backend === "googledrive") return <GoogleDriveLogo className={cls} />;
  return <RemoteStorageLogo className={cls} />;
}

// ─── Public component ─────────────────────────────────────────────────────────

export type LoginButtonsProps = Omit<RootProps, "children">;

export function LoginButtons(props: LoginButtonsProps) {
  return (
    <RSW.Root {...props} skipInitial>
      <LoginButtonsContent />
    </RSW.Root>
  );
}

export default LoginButtons;

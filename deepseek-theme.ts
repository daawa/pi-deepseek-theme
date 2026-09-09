import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function deepseekThemeExtension(pi: ExtensionAPI): void {
	pi.on("resources_discover", () => ({
		// Demo only: package manifest themes are loaded before the saved theme is
		// applied. Paths contributed here arrive too late for cold-start selection.
		themePaths: [],
	}));

	// /name for RPC mode. Registering it unconditionally would trip the TUI's
	// built-in command conflict warning in interactive mode, where the built-in
	// /name already shadows it. RPC has no built-in commands, so register only
	// there. bindExtensions sets mode before session_start is emitted.
	let nameCommandRegistered = false;
	pi.on("session_start", (_event, ctx) => {
		if (nameCommandRegistered || ctx.mode !== "rpc") return;
		nameCommandRegistered = true;

		pi.registerCommand("name", {
			description: "Set or show the session name (usage: /name [new name])",
			handler: async (args, ctx) => {
				const name = args.trim();

				if (!name) {
					const current = pi.getSessionName();
					ctx.ui.notify(current ? `Session name: ${current}` : "No session name set", "info");
					return;
				}

				pi.setSessionName(name);
				const normalized = pi.getSessionName();
				if (normalized === undefined) {
					ctx.ui.notify("Session name cleared", "info");
				} else if (normalized !== name) {
					ctx.ui.notify(`Session name set: ${normalized} (normalized from "${name}")`, "info");
				} else {
					ctx.ui.notify(`Session name set: ${normalized}`, "info");
				}
			},
		});
	});
}
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function deepseekThemeExtension(pi: ExtensionAPI): void {
	pi.on("resources_discover", () => ({
		// Demo only: package manifest themes are loaded before the saved theme is
		// applied. Paths contributed here arrive too late for cold-start selection.
		themePaths: [],
	}));
}

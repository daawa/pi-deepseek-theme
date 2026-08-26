import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const themesDir = join(dirname(fileURLToPath(import.meta.url)), "themes");

export default function deepseekThemeExtension(pi: ExtensionAPI): void {
	pi.on("resources_discover", () => ({
		themePaths: [themesDir],
	}));
}

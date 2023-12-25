import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { VitePlugin } from "@electron-forge/plugin-vite";
// import path from "path";

const config: ForgeConfig = {
  packagerConfig: {
    // icon: path.join(__dirname, "src", "assets", "icon"),
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "Updatable App",
      authors: "Octavio Cossy Torquati",
      description: "This is my incredible updatable app!",
      exe: "updatable_app.exe",
    }),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Octaviocossy",
          name: "updatable-electron-app",
        },
      },
    },
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
};

export default config;

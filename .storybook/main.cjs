const { mergeConfig, loadConfigFromFile } = require("vite");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config

    return mergeConfig(config, {
      server: {
        proxy: {
          "/api": {
            target: "http://abyrvalg.sexologvasilenko.com:8082",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    });
  },
};

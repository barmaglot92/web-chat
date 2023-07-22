import postcssNesting from "postcss-nesting";

export default {
  map: false,
  plugins: {
    "postcss-plugin": {
      postcssNesting,
    },
  },
};

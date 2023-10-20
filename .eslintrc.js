export const env = {
  browser: true,
  es2021: true,
  jest: true,
};
export const extendsArr = [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:prettier/recommended",
];
export const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 12,
  sourceType: "module",
};
export const plugins = ["react"];
export const settings = {
  react: {
    version: "detect",
  },
};
export const rules = {
  "react/react-in-jsx-scope": "off",
};

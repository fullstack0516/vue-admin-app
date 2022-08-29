module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/recommended",
    "@vue/standard",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    eqeqeq: ["error", "always"],
    "no-restricted-imports": ["error", "generated-sources"],
    "comma-style": ["error", "last"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-dangle": ["error", "always-multiline"],
    "prettier/prettier": [
      "error",
      {
        semi: false,
        trailingComma: "all",
        singleQuote: false,
        printWidth: 100,
      },
    ],
    "no-console": "warn",
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "max-len": "off",
        "vue/multi-word-component-names": "off",
        "vue/no-setup-props-destructure": "off",
        "vue/max-len": [
          "error",
          {
            code: 100,
            template: 300,
            ignoreStrings: true,
            ignoreUrls: true,
          },
        ],
      },
    },
  ],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
}

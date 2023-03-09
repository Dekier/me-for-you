module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "add",
        "update",
        "feat",
        "fix",
        "docs",
        "chore",
        "style",
        "refactor",
        "clear",
        "delete",
        "ci",
        "test",
        "revert",
        "perf",
        "build",
      ],
    ],
  },
};

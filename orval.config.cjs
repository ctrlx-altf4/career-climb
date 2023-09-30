module.exports = {
  basiyoApp: {
    input: {
      target: "./swagger.yaml",
    },
    output: {
      target: "./src/api/generated.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/useAxios.ts",
          name: "useAxios",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};

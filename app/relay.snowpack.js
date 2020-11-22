const babel = require("@babel/core");

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: "relay-replace",
    async transform({ id, contents, fileExt }) {
      if (fileExt === ".js") {
        const result = await babel.transformAsync(contents, {
          filename: id,
          ast: true,
          plugins: [
            ["relay", { artifactDirectory: "./src/__generated__" }],
            "transform-commonjs",
          ],
        });
        var count = 0;
        const otherResult = await babel.transformFromAstAsync(
          result.ast,
          undefined,
          {
            plugins: [
              function myPlugin() {
                return {
                  visitor: {
                    ImportDeclaration(path) {
                      if (
                        path.node.source.type === "StringLiteral" &&
                        path.node.source.value.endsWith(".graphql")
                      ) {
                        path.node.source.value = path.node.source.value.replace(
                          new RegExp(".graphql$"),
                          ".graphql.js"
                        );
                      }
                    },
                    ExportDefaultDeclaration(path) {
                      if (count === 1) path.remove();
                      else count++;
                    },
                  },
                };
              },
            ],
          }
        );

        return otherResult.code;
      }
    },
  };
};

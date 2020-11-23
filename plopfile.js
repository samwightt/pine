module.exports = function (plop) {
  plop.setHelper("uppercase", (text) => {
    const words = text.split(" ");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  });

  plop.setGenerator("module", {
    description: "Generate a new module and automatically import it.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the module name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "server/src/modules/{{uppercase name}}.ts",
        templateFile: "plop-templates/module.hbs",
      },
      {
        type: "append",
        path: "server/src/modules/index.ts",
        template: 'export * from "./{{name}}";',
      },
    ],
  });

  plop.setGenerator("component", {
    description: "Quickly generate a new React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter a component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/src/components/{{uppercase name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
    ],
  });
};

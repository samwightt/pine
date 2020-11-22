module.exports = function (plop) {
  plop.setHelper("uppercase", (text) => {
    const words = text.split(" ");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
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
        path: "src/components/{{uppercase name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
    ],
  });
};

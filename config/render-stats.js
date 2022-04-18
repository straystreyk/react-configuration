function makeTemplateStats(options) {
  const { htmlWebpackPlugin } = options;
  const { templateOptions } = htmlWebpackPlugin.options;

  const result = Object.assign({}, templateOptions, {
    js: htmlWebpackPlugin.files.js.map((el) => "./" + el),
    css: htmlWebpackPlugin.files.css.map((el) => "./" + el),
  });

  return result;
}

export default function renderStats(options) {
  return JSON.stringify(makeTemplateStats(options), null, 2);
}

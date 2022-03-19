function makeTemplateStats(options) {
  const { htmlWebpackPlugin } = options;
  const { templateOptions } = htmlWebpackPlugin.options;

  const result = Object.assign({}, templateOptions, {
    js: htmlWebpackPlugin.files.js,
    css: htmlWebpackPlugin.files.css,
  });

  return result;
}

export default function renderStats(options) {
  return JSON.stringify(makeTemplateStats(options), null, 2);
}

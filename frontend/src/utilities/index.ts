export const replaceEmptyParagraphs = (html: string) => {
  return html.replace(/<p>(\s|&nbsp;)*<\/p>/g, "<br />");
};

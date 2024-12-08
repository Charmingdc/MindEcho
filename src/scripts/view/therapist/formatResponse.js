'use strict';

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const escapeHtml = (html) => {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const formatResponse = (response) => {
  const escapedResponse = escapeHtml(response);

  const htmlOutput = marked.parse(escapedResponse);
  
  return htmlOutput;
}
import path from "path";

export const ROOT_DIRECTORY     = path.resolve(__dirname, '..');
export const DB_PATH            = path.join(ROOT_DIRECTORY, 'db', 'viruthi.db');
export const PRELOAD_JS_PATH    = path.join(ROOT_DIRECTORY, 'dist', 'preload.js');
export const INDEX_HTML_PATH    = path.join(ROOT_DIRECTORY, 'dist', 'index.html');
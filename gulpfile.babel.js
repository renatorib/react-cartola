import { readdirSync } from 'fs';
import { join, extname } from 'path';

const tasksPath = join(__dirname, 'gulp');
const scriptsFilter = (filename) => /(\.(js|jsx)$)/i.test(extname(filename));

readdirSync(tasksPath)
  .filter(scriptsFilter)
  .forEach((task) => require(join(tasksPath, task)));

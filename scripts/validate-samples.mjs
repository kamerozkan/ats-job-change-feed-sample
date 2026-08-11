import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2019 from 'ajv/dist/2019.js';
import addFormats from 'ajv-formats';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const recordSchema = readJson(join(root, 'schema/dataset-record.schema.json'));
const listSchema = readJson(join(root, 'schema/dataset-record-list.schema.json'));
const ajv = new Ajv2019({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(recordSchema);
const validate = ajv.compile(listSchema);
const outputFiles = readdirSync(join(root, 'outputs'))
  .filter((name) => name.endsWith('.json'))
  .sort();

let failed = false;
for (const name of outputFiles) {
  const path = join(root, 'outputs', name);
  const data = readJson(path);
  if (validate(data)) {
    console.log(`${name}: valid`);
    continue;
  }
  failed = true;
  console.error(`${name}: invalid`);
  console.error(ajv.errorsText(validate.errors, { separator: '\n' }));
}

if (failed) process.exitCode = 1;

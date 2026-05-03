import fs from 'fs';
import readline from 'readline';

const filePath = './huge-log.txt';

function createTestFile() {
  const data = `INFO Server started
INFO User login
ERROR Database connection failed
INFO Request received
ERROR Timeout occurred
INFO Server stopped`;
  fs.writeFileSync(filePath, data);
}

async function processFile() {
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let totalLines = 0;
  let errorLines = 0;

  for await (const line of rl) {
    totalLines++;

    if (line.includes('ERROR')) {
      errorLines++;
    }
  }

  console.log('Result:');
  console.log('Total rows:', totalLines);
  console.log('ERROR rows:', errorLines);
}

async function main() {
  createTestFile();
  await processFile();
}
main();
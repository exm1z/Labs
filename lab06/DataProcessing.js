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
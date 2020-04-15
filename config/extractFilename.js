function extractFilename(filepath) {
  return filepath.split('/')[-1];
}

module.exports = extractFilename;


import webpack, { Compiler } from "webpack";
import { resolve as resolvePath, isAbsolute as isAbsolutePath } from 'path';
import { unlinkSync as deleteFileFromSystem } from 'fs';

interface WCFOPPluginOptions {
  filesToClear: [string];
};

class WCFOPPlugin {
  private filesToClear: [string];
  constructor({ filesToClear }: WCFOPPluginOptions) {
    this.filesToClear = filesToClear;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tap('WebpackCleanFromOutputPlugin',({  }) => {
      let outputPathIntermediate = compiler.options.output?.path;
      if (!outputPathIntermediate) {
        throw new Error('Output path needs to be defined');
      }
      const outputPath = <string>outputPathIntermediate;
      this.filesToClear.forEach((currentFile) => {
        try {
          if (isAbsolutePath(currentFile)) {
            deleteFileFromSystem(currentFile);
            return;
          }
          const pathToFile = resolvePath(outputPath, currentFile);
          deleteFileFromSystem(pathToFile);
          return;
        } catch (error) {
          console.error({ error });
          process.exit(1);
        }
      });
      // callback();
    });
  }
}

export default WCFOPPlugin;

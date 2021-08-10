import * as glob from 'glob';
import { LogObj } from '../../utils/log';
import { translateCode, translateCodeAndWatch } from '../codegen/translateCode';
import * as path from 'path';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';
import { ModuleRegistry } from '../cjsModules/moduleRegistry';
const ncp = require('ncp');
import { CliOptions } from '../../types';
import { sync as mkdirpSync } from 'mkdirp';
const replace = require('stream-replace');

export function transpile(options: CliOptions, baseDir: string, outDir: string, log: LogObj) {
  const namespaces = {
    root: options.rootNs,
    builtins: options.builtinsNs || (options.rootNs ? options.rootNs + '\\Builtins' : 'Builtins'),
  };

  const builtinsRelativePath = ModuleRegistry.namespaceToPath(namespaces.builtins);

  let builtinsPath: string;
  if (options.rewriteBuiltinsRoot) {
    if (!options.builtinsNs) {
      log.warn('builtinsNs option should be provided if rewriteBuiltinsRoot is used', []);
    }

    builtinsPath = path.join(options.rewriteBuiltinsRoot, builtinsRelativePath);
  } else {
    builtinsPath = path.resolve(__dirname, '..', '..', '..', 'builtins');
  }

  const serverFilesRoot = options.serverBaseDir ?? options.baseDir;

  glob(options.src, (e: Error, matches: string[]) => {
    if (e) {
      log.error('%s', [e.toString()]);
      process.exit(1);
      return;
    }

    const compilerOptions = {
      baseUrl: baseDir,
      paths: options.tsPaths || {},
    };

    (options.watch ? translateCodeAndWatch : translateCode)(
      matches.map((p) => path.resolve('./', p)),
      options.ignoreImports,
      options.replaceImports,
      options.tsPaths,
      log,
      {
        baseDir,
        serverFilesRoot,
        builtinsPath,
        aliases: options.aliases,
        namespaces,
        encoding: options.encoding || 'utf-8',
        disableCodeElimination: options.noZap,
        preferTernary: options.preferTernary,
        options: compilerOptions,
        onData: (sourceFilename: string, targetFilename: string, content: string) => onData(targetFilename, content),
        onFinish,
        jsxPreferences: options.jsxPreferences || {},
      }
    );
  });

  function onData(filename: string, content: string) {
    const outputFilename = outDir + '/' + filename;
    log.info('Emitting file: %s', [outputFilename]);
    const outputDir = path.dirname(outputFilename);
    mkdirpSync(outputDir);
    fs.writeFileSync(outputFilename, iconv.encode(content, options.encoding || 'utf-8'));
  }

  function onFinish() {
    if ((log.errCount || 0) > 0 && options.bail === 'error') {
      process.exit(1);
    }
    if ((log.errCount || 0) + (log.warnCount || 0) > 0 && options.bail === 'warn') {
      process.exit(1);
    }

    if (options.rewriteBuiltinsRoot) {
      log.special('Skip builtins copy bacause rewriteBuiltinsRoot options is provided', []);
      return;
    }

    const bTgt = path.join(outDir, ModuleRegistry.namespaceToPath(namespaces.builtins));

    log.special('Copying builtins files', []);
    log.special('From: %s', [builtinsPath]);
    log.special('To: %s', [bTgt]);

    ncp(builtinsPath, bTgt, {
      transform: function(read: any, write: any) {
        read.pipe(replace(/__ROOTNS__\\Builtins/g, namespaces.builtins)).pipe(write);
      },
    }, (err: any) => {
      if (!err) {
        log.special('Builtins base files successfully copied', []);
      }
    });
  }
}

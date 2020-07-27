import { createSourceFile, ScriptTarget, SourceFile } from 'typescript';
import { existsSync, readFileSync } from 'fs';

const sourceFiles: { [key: string]: SourceFile | null } = {};

// Try find d.ts source in typescript folder
export function getDtsSourceFile(name: string, target?: ScriptTarget) {
  if (sourceFiles[name] === undefined) {
    let path = name.startsWith('/') ? name : require.resolve('typescript/lib/' + name);
    if (existsSync(path)) {
      let input = readFileSync(path, {encoding: 'utf-8'});
      sourceFiles[name] = createSourceFile(name, input, target!);
    } else {
      sourceFiles[name] = null;
    }
  }

  return sourceFiles[name];
}

export function getSourceFile(path: string, target?: ScriptTarget) {
  if (sourceFiles[path] === undefined) {
    if (existsSync(path)) {
      let input = readFileSync(path, {encoding: 'utf-8'});
      sourceFiles[path] = createSourceFile(path, input, target!);
    } else {
      sourceFiles[path] = null;
    }
  }

  return sourceFiles[path];
}
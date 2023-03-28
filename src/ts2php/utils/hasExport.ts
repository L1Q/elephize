import * as ts from 'typescript';
import { LogObj } from '../types';

export function hasExport(node: ts.Node, log: LogObj) {
  if (ts.isVariableStatement(node) && node.modifiers) {
    for (const m of node.modifiers) {
      if (m.kind === ts.SyntaxKind.DefaultKeyword) {
        log.error('Do not use `export default` in transpiled code (and preferably anywhere else). Use named exports.', [], log.ctx(node));
        return null;
      }

      if (m.kind === ts.SyntaxKind.ExportKeyword) {
        return true;
      }
    }
  }
}

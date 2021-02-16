import { translateCode} from '../ts2php/components/codegen/translateCode';
import * as path from 'path';
import { getBuildProgram } from '../ts2php/components/codegen/programUtils/buildProgramFactory';
import * as ts from 'typescript';
import {
  flagParentOfType,
  getChildChainByType,
  getClosestParentOfType,
  getClosestParentOfTypeWithFlag,
  getLeftExpr
} from '../ts2php/utils/ast';
import { NodeFlagStore } from '../ts2php/components/codegen/nodeFlagStore';
import { defaultOptions } from '../ts2php/components/codegen/defaultCompilerOptions';
import { configureLogging } from '../ts2php/components/cli/configureLogging';

const log = configureLogging({
  baseDir: '', output: '', outDir: ''
});

function compile(files: string[]): ts.SourceFile | undefined {
  let [program] = getBuildProgram(files, {}, '', {},
    {
      compilerOptions: defaultOptions
    },
    () => null,
    log
  );
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) { // skip .d.ts if any
      return sourceFile;
    }
  }
}

function findFirstNode(where: ts.Node, type: ts.SyntaxKind) {
  function _traverse(where: ts.Node, type: ts.SyntaxKind): ts.Node | null {
    if (where.kind === type) {
      return where;
    }

    for (let child of where.getChildren()) {
      const result = _traverse(child, type);
      if (result) {
        return result;
      }
    }

    return null;
  }

  return _traverse(where, type);
}

function recompile(fileNames: string[], onData: (filename: string, rootNode: ts.Node, nodeFlagStore: NodeFlagStore) => void) {
  return translateCode(fileNames, {}, {}, log, {
    baseDir: '',
    aliases: {},
    namespaces: { root: '', builtins: '' },
    onBeforeRender: onData,
    onData: () => undefined
  });
}

test('ts2php.AstTools.leftExpr', () => {
  const srcNode = compile([path.resolve(__dirname, 'specimens', 'astTools', 'leftExpr.ts')]);
  if (!srcNode) {
    throw new Error('File not found');
  }

  const [ expr ] = srcNode.statements.slice(1, 2);
  const lExp = (expr.getChildren(srcNode)[0] as ts.BinaryExpression).left;

  const result = getLeftExpr(lExp as ts.LeftHandSideExpression, srcNode);
  expect(result).toBeTruthy();
  expect(result?.kind).toEqual(ts.SyntaxKind.Identifier);
  expect(result?.escapedText).toEqual('ident');
});

test('ts2php.AstTools.flagParentOfType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode, store) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.VariableDeclaration], { name: 'ololo' }, store);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(store.get(expr)).toMatchObject({ name: 'ololo' });
  });
});

test('ts2php.AstTools.flagParentOfType.Notfound', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode, store) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.VariableDeclaration], { name: 'ololo' }, store);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(store.get(expr)).toMatchObject({});
  });
});

test('ts2php.AstTools.getClosestParentOfType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    const parent = getClosestParentOfType(stringLiteral, ts.SyntaxKind.VariableDeclaration);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.VariableDeclaration);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(parent).toMatchObject(expr);
  });
});

test('ts2php.AstTools.getClosestParentOfTypeWithFlag', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode, store) => {
    const stringLiteral = findFirstNode(rootNode, ts.SyntaxKind.StringLiteral);
    if (!stringLiteral) {
      throw new Error('No literal found');
    }
    flagParentOfType(stringLiteral, [ts.SyntaxKind.CallExpression], { name: 'ololo' }, store);
    const parent = getClosestParentOfTypeWithFlag(stringLiteral, ts.SyntaxKind.CallExpression, { name: 'ololo' }, store);
    const expr = findFirstNode(rootNode, ts.SyntaxKind.CallExpression);
    if (!expr) {
      throw new Error('No expression found');
    }

    expect(parent).toMatchObject(expr);
  });
});

test('ts2php.AstTools.getChildChainByType', () => {
  recompile([path.resolve(__dirname, 'specimens', 'astTools', 'flagParentOfType.ts')], (filename, rootNode) => {
    const stmt = findFirstNode(rootNode, ts.SyntaxKind.VariableStatement);
    if (!stmt) {
      throw new Error('No statement found');
    }

    const call = getChildChainByType(stmt, [
      ts.SyntaxKind.VariableDeclarationList,
      ts.SyntaxKind.SyntaxList,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.CallExpression
    ]);
    expect(call).toBeTruthy();
    expect(call!.kind).toEqual(ts.SyntaxKind.CallExpression);
  });
});

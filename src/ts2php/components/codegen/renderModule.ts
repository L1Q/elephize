import * as ts from 'typescript';
import { Declaration, JSXPreferences, NodeHooks, NsMap, LogObj } from '../../types';
import { ModuleRegistry } from '../cjsModules/moduleRegistry';
import { CommonjsModule } from '../cjsModules/commonjsModule';
import { Scope } from '../unusedCodeElimination/usageGraph';
import { Context } from '../context';
import { LogVerbosity } from '../../utils/log';
import { renderNode } from './renderNodes';
import { NodeFlagStore } from './nodeFlagStore';

/**
 * Module-level codegen. May emit one or more modules (in case of extracted component)
 *
 * @param checker
 * @param compilerOptions
 * @param root
 * @param nodeFlagsStore
 * @param baseDir - Note! This should be the SAME baseDir as passed into typescript as compilerOptions.baseUrl!
 * @param namespaces
 * @param encoding
 * @param registry
 * @param currentModule
 * @param log
 * @param disableCodeElimination
 * @param builtinsNs
 * @param jsxPreferences
 * @param hooks
 */
export function renderModule(
  checker: ts.TypeChecker,
  compilerOptions: ts.CompilerOptions,
  root: ts.Node,
  nodeFlagsStore: NodeFlagStore,
  baseDir: string,
  namespaces: NsMap,
  encoding: string,
  registry: ModuleRegistry,
  currentModule: CommonjsModule,
  log: LogObj,
  disableCodeElimination = false,
  builtinsNs = '',
  jsxPreferences: JSXPreferences,
  hooks: NodeHooks
): void {
  Scope._forceDisableUnusedVarsElimination = disableCodeElimination;
  const moduleScope = Scope.newRootScope<Declaration>({ flags: {} }, currentModule.sourceFileName, log, [
    'console',
    'document',
    'window',
    'Math',
    'Object',
    'Array',
  ]);

  const contextDry = new Context<Declaration>(
    moduleScope,
    checker,
    nodeFlagsStore,
    compilerOptions,
    currentModule,
    true,
    baseDir,
    namespaces,
    encoding,
    registry,
    log,
    builtinsNs,
    jsxPreferences,
    hooks,
  );

  // First pass: build trees and collect var usage info
  renderNode(root, contextDry);

  // Trigger usage vars graph traversal
  moduleScope.terminalNode.markUsage();

  if (log.verbosity & LogVerbosity.WITH_USAGE_GRAPH_DUMP) {
    moduleScope.terminalNode._dump((msg: string) => log.info(msg, []));
  }

  currentModule.clearStatements();
  registry.clearClasses();
  nodeFlagsStore.clear();

  const context = new Context(
    moduleScope,
    checker,
    nodeFlagsStore,
    compilerOptions,
    currentModule,
    false,
    baseDir,
    namespaces,
    encoding,
    registry,
    log,
    builtinsNs,
    jsxPreferences,
    hooks,
  );

  // Second pass: build code with cleaned unused vars
  renderNode(root, context);
}

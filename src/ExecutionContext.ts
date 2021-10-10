import { GeneratorObject } from './GeneratorObject'
import { JSValueObjectFunction, JSValueNull } from './JSValue'
import { LexicalEnvironment } from './LexicalEnvironment'
import { Realm } from './Realm'
import { VariableEnvironment } from './VariableEnvironment'

enum CodeEvaluationState {}

export class ExecutionContext {
  public codeEvaluationState: CodeEvaluationState
  public Function: JSValueObjectFunction | JSValueNull
  public Realm: Realm

  public lexicalEnvironment: LexicalEnvironment
  public variableEnvironment: VariableEnvironment

  public Generator: GeneratorObject
}

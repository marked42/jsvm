import { DeclarativeEnvironmentRecord } from './DeclarativeEnvironmentRecord'
import { JSValue, JSValueObject, JSValueUndefined } from './JSValue'

type ThisBindingStatus = 'lexical' | 'initialized' | 'uninitialized'

export class FunctionEnvironmentRecord extends DeclarativeEnvironmentRecord {
  public thisValue: JSValue
  public thisBindingStatus: ThisBindingStatus
  public functionObject: JSValueObject
  public homeObject: JSValueObject | JSValueUndefined
  public newTarget: JSValueObject | JSValueUndefined

  BindThisValue(value: JSValue) {
    this.thisValue = value
    this.thisBindingStatus = 'initialized'
  }

  GetThisBinding() {
    if (this.thisBindingStatus === 'uninitialized') {
      throw new ReferenceError()
    }
  }

  GetSuperBase() {}
}

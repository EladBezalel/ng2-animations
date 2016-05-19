import { Type } from '../../src/facade/lang';
import { GetterFn, SetterFn, MethodFn } from './types';
export interface PlatformReflectionCapabilities {
    isReflectionEnabled(): boolean;
    factory(type: Type): Function;
    interfaces(type: Type): any[];
    hasLifecycleHook(type: any, lcInterface: any, lcProperty: string): boolean;
    parameters(type: any): any[][];
    annotations(type: any): any[];
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    importUri(type: any): string;
}

import {validate} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';


export function Validate<T>(value: ClassType<T>) {
    return function(target: any, propertyKey: string, descriptor?: PropertyDescriptor): any {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        let method = descriptor.value;

        descriptor.value = async function(...args: any[]) {
            let reqObject = args[0];
            let next = args[2];
            let clazzObj: T = plainToClass(value, reqObject.body);
            let errors = await validate(clazzObj);
            if (errors.length > 0) {
                return next(errors);
            }
            return method.apply(target, [clazzObj, ...args]);
        };
        return descriptor;
    }
}
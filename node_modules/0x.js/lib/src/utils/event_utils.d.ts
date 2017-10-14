import { EventCallback, ContractEventObj, ContractEventEmitter } from '../types';
export declare const eventUtils: {
    wrapEventEmitter(event: ContractEventObj): ContractEventEmitter;
    _getBigNumberWrappingEventCallback(eventCallback: EventCallback): EventCallback;
};

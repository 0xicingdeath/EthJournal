export declare class BlockchainLifecycle {
    private rpc;
    private snapshotId;
    constructor();
    startAsync(): Promise<void>;
    revertAsync(): Promise<void>;
}

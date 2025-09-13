export type ObserverCallback = () => void;

export class Observer {
    private _callback: ObserverCallback | null = null;
    private _target: Node | null = null;
    private _mutationObserver: MutationObserver | null = null;

    constructor (private readonly _config: MutationObserverInit) {
    }

    setCallback (callback: ObserverCallback): void {
        this._callback = callback;
    }

    setTarget (target: Node):void {
        this._target = target;
    }

    observe (): void {
        this.disconnect();

        if (this._callback && this._target) {
            this._mutationObserver = new MutationObserver(this._callback);
            this._mutationObserver.observe(this._target, this._config);
        }
    }

    disconnect (): void {
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
            this._mutationObserver = null;
        }
    }
}
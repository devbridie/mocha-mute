type ItEmpty = () => void;
type ItWithDone = (done: () => void) => void;
type ItWithPromise = () => Promise<void>;
type MochaTest = ItEmpty | ItWithDone | ItWithPromise;

declare function MochaMute(action: () => void): void;

declare namespace MochaMute {
    export function it(name: string, test: MochaTest): void;
    export function promise<T>(promise: Promise<T>): Promise<T>;
}

export = MochaMute;
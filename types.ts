import { CommitOptions, Store } from "vuex";
import { Vue } from "vue/types/vue";

interface MutationsDescriptor {
    numberArg(state: any, arg: number);
}

type SecondArgument<T> = T extends (arg1: any, arg2: infer U) => any ? U : never;
export abstract class TypedStore<State, Mutations> extends Store<State> {
    commit: {
        <K extends keyof Mutations>(payloadWithType: { type: K, payload?: SecondArgument<Mutations[K]> }, options?: CommitOptions): void;
        // NOTE: this overload should be last, so TS will show error for this if no matching overload found
        <K extends keyof Mutations>(mutationName: K, payload: SecondArgument<Mutations[K]>, options?: CommitOptions): void;
    };
}
export abstract class GenericlessTypedStore extends Store<any> {
    commit: {
        <K extends keyof MutationsDescriptor>(payloadWithType: { type: K, payload?: SecondArgument<MutationsDescriptor[K]> }, options?: CommitOptions): void;
        // NOTE: this overload should be last, so TS will show error for this if no matching overload found
        <K extends keyof MutationsDescriptor>(mutationName: K, payload: SecondArgument<MutationsDescriptor[K]>, options?: CommitOptions): void;
    };
}

export abstract class VueComponent<State, Mutations, EmitMessages extends string> extends Vue {
    $store: TypedStore<State, Mutations>;
    $emit: (event: EmitMessages, ...args: any[]) => this;
}

export abstract class ConcreteVueComponent<Messages extends string = string> extends VueComponent<any, MutationsDescriptor, Messages> {}

export abstract class GenericlessVueComponent extends VueComponent<any, MutationsDescriptor, "a" | "b"> {}

export abstract class GenericlessVueComponent2 extends Vue {
    $store: GenericlessTypedStore;
}
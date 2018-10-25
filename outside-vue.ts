import { ConcreteVueComponent, GenericlessVueComponent, GenericlessVueComponent2 } from "./types";

// if we don't provide Message type, it automatically resolves to "string" and typecheck works
class EntryComponent extends ConcreteVueComponent {
    foo() {
        // Message automatically resolved to "string"
        this.$emit("asdg");

        // typecheck works fine
        this.$store.commit("numberArg", 1);
        this.$store.commit("numberArg", "string");
    }
}

class EntryComponent1 extends ConcreteVueComponent<"a" | "b"> {
    foo() {
        this.$emit("a");
        this.$emit("b");
        // expected error
        this.$emit("c");
    }
}

class EntryComponent2 extends GenericlessVueComponent {
    foo() {
        this.$emit("a");
        this.$emit("typecheck works!");
        this.$store.commit("numberArg", 1);
    }
}

class EntryComponent3 extends GenericlessVueComponent2 {
    foo() {
        // if there is no generic in abstract class, typecheck works normally
        this.$store.commit("numberArg", 1);
    }
}
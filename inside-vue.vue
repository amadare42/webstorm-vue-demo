<script lang="ts">
    import { ConcreteVueComponent, GenericlessVueComponent, GenericlessVueComponent2 } from "./types";

    // if we don't provide Message type, it should automatically resolve to "string"
    class EntryComponent extends ConcreteVueComponent {
        foo() {
            // Message should be automatically resolved to "string", but it doesn't
            this.$emit("asdg");

            // typecheck wont work
            this.$store.commit("numberArg", 1);
            this.$store.commit("numberArg", "string");
        }
    }

    // if generic resolves inside vue-component, all works fine
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
</script>
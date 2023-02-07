import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const counter = ref<number>(0);

        const aumentar = () => {
            return (counter.value += 1);
        };
        const disminuir = () => {
            return (counter.value -= 1);
        };

        return {
            //properties
            counter,

            //Methods
            aumentar,
            disminuir,
        };
    },
});

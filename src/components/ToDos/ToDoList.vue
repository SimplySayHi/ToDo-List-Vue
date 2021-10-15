<template>
     <div class="todo-list__inner">
        <div class="todo-list__header">
            <span class="todo-list__header-title">{{ title }}</span>
            <span class="todo-list__header-counter">{{ itemsCount }}</span>
        </div>
        <div class="todo-list">
            <ToDoItem v-for="item in items" :item="item" :key="item.id" />
        </div>
    </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue'

export default {
    props: ['title', 'items'],
    components: {
        ToDoItem
    },
    computed: {
        itemsCount(){
            return this.items.length;
        }
    }
}
</script>

<style lang="scss">
    .todo-list {
        &__inner {
            margin-top: 40px;
        }
        &__header {
            display: flex;
            align-items: center;

            &-title {
                color: $blue-light-4;
            }
            &-counter {
                min-width: 20px;
                height: 20px;
                border-radius: 100px;
                background-color: $blue-light-4;
                color: $blue-4;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 10px;
                font-size: 12px;
                line-height: 0;
            }
        }
    }
</style>
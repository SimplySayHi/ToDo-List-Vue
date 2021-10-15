<template>
    <section class="todo-list__wrapper">
        <div class="todo-list__container">
            <h2 class="todo-list__main-title">
                MyTrack
            </h2>
            <ToDoNew />
            <ToDoList title="In progress" :items="inProgressItems" />
            <ToDoList title="Done" :items="completedItems" />
            <portal-target name="todo-edit-modal" multiple></portal-target>
        </div>
    </section>
</template>

<script>
import ToDoNew from './ToDoNew.vue'
import ToDoList from './ToDoList.vue'

const sortByPriority = list => list.sort((x, y) => Number(y.hasPriority) - Number(x.hasPriority));

export default {
    components: {
        ToDoNew,
        ToDoList
    },
    computed: {
        items(){
            return this.$store.getters.todos;
        },
        inProgressItems(){
            return sortByPriority( this.items.filter(item => !item.isCompleted) );
        },
        completedItems(){
            return sortByPriority( this.items.filter(item => item.isCompleted) );
        }
    }
}
</script>

<style lang="scss">
    .todo-list__wrapper {
        flex: 1;
        padding: 40px 35px;
        margin-bottom: 60px;
    }
    .todo-list__container {
        max-width: 880px;
        margin-left: auto;
        margin-right: auto;
    }
    .todo-list__main-title {
        font-size: 24px;
        color: $blue-light-4;
        line-height: 1;
        margin-top: 0;
        margin-bottom: 40px;
    }
    @media (min-width: 992px) {
        .todo-list__wrapper {
            margin-bottom: 0;
        }
        .todo-list__main-title {
            display: none;
        }
    }
</style>
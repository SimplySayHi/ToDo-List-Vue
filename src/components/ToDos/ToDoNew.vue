<template>
    <div class="todo-new">
        <Button type="button" class="todo-new__modal-button" @click.native="openNewToDoModal">
            New task <i class="todo-new__modal-button-sign plus"></i>
        </Button>
        <div class="todo-new__form-wrapper" :class="{'show': showNewToDoModal}" ref="toDoModal">
            <div class="todo-new__header">
                <span class="todo-new__header-title">New task</span>
                <span class="todo-new__header-close" @click="closeNewToDoModal">
                    <i class="todo-new__modal-button-sign plus plus--x"></i>
                </span>
            </div>
            <form class="todo-new__form" @submit.prevent="addNewToDo">
                <div class="todo-new__form-group todo-new__form-group--left">
                    <input type="text" v-model="todo.text" placeholder="Insert task title..." class="form-field" />
                </div>
                <div class="todo-new__form-group todo-new__form-group--right">
                    <SwitchInput v-model="todo.hasPriority" label="High priority" />
                    <Button type="submit" class="btn-light-blue todo-new__btn-submit" :disabled="disableSubmitBtn">ADD</Button>
                </div>
            </form>
        </div>
        <div class="todo-new__modal_backdrop" @click="closeNewToDoModal"></div>
    </div>
</template>

<script>
import Button from '../UI/Button.vue';
import SwitchInput from '../UI/SwitchInput.vue';

export default {
    data(){
        return {
            disableSubmitBtn: true,
            showNewToDoModal: false,
            todo: {
                text: '',
                hasPriority: false
            }
        }
    },
    components: {
        Button,
        SwitchInput
    },
    methods: {
        addNewToDo(){
            const vm = this;

            if( !vm.todo.text.trim().length ){ return }

            const newToDo = {
                id: new Date().getTime(),
                text: vm.todo.text,
                hasPriority: vm.todo.hasPriority,
                isCompleted: false
            };

            vm.$store.dispatch('addToDo', newToDo);
            vm.closeNewToDoModal();
            vm.$nextTick(() => {
                vm.todo.text = '';
                vm.todo.hasPriority = false;
            });
        },
        openNewToDoModal(){
            this.showNewToDoModal = true;
        },
        closeNewToDoModal(){
            this.showNewToDoModal = false;
        }
    },
    watch: {
        "todo.text"(value){
            this.disableSubmitBtn = value.trim().length === 0;
        }
    }
}
</script>

<style lang="scss">
.todo-new {
    &__header {
        display: flex;
        justify-content: space-between;

        &-title {
            color: $blue-light-4;
        }
        &-close {
            cursor: pointer;
            color: $blue-light-4;
            font-size: 20px;
        }
    }
    &__modal-button {
        width: 100%;
        border-radius: 12px;
        min-height: 60px;
        font-size: 16px;
        color: $blue-light-4;
        background-color: $blue-1;
        text-transform: none;
        font-weight: 500;

        &-sign {
            margin-left: 10px;
        }
    }
    &__form-wrapper {
        display: none;

        + .todo-new__modal_backdrop {
            display: none;
            position: fixed;
            z-index: 10;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(#020713, 0.9);
        }

        &.show {
            display: block;
        }
    }
    &__form {
        display: flex;
        background-color: $blue-1;
        color: $blue-light-4;
        padding: 10px 10px 10px 20px;
        border-radius: 12px;
        margin-top: 10px;

        &-group {
            display: flex;
            align-items: center;
        }
    }
    .form-field {
        width: 100%;
        background-color: transparent;
        border: 0 none;
        color: $blue-light-4;
        outline: none !important;
        font-size: 1rem;
        font-weight: 500;
    }
    &__btn-submit {
        margin-left: 15px;
    }
}
@media (max-width: 991px) {
    .todo-new {
        &__form {
            flex-direction: column;

            &-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: calc(100% - 70px);
                margin: 35px;
                border-radius: 12px;
                background-color: $blue-1;
                z-index: 15;

                &.show {
                    + .todo-new__modal_backdrop {
                        display: block;
                    }
                }
            }
            &-group--right {
                justify-content: space-between;
            }
        }
        &__header,
        &__form {
            padding: 20px 25px;
        }
        &__header {
            border-bottom: 1px solid #1F2942;
            line-height: 1;
            align-items: center;
        }
        .form-field {
            margin-bottom: 65px;
            font-size: 18px;
        }
    }
}
@media (min-width: 992px) {
    .todo-new {
        &__modal-button,
        &__header-close {
            display: none;
        }
        &__form-wrapper {
            display: block;
        }
        &__form {
            &-group {
                width: 50%;

                &--right {
                    justify-content: flex-end;
                }
            }
        }
        &__btn-submit {
            margin-left: 60px;
        }
    }
}
</style>
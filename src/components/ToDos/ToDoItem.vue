<template>
    <div class="todo-item">
        <div class="todo-item__inner">
            <div class="todo-item__inner-body">
                <input ref="$check" :id="item.id" type="checkbox" :checked="item.isCompleted" @change="switchCompleted(item, $event)" />
                <label :for="item.id" class="todo-item__inner-body" @click="openEditModal($event, item)">
                    <span class="todo-item__priority" :class="{'--on': item.hasPriority }"></span>
                    <div class="todo-item__text">
                        {{ item.text }}
                    </div>
                </label>
            </div>
            <button class="todo-item__delete" @click="deleteItem(item.id)">
                <img src="../../assets/icon-trash.svg" width="16" />
            </button>
        </div>
        <portal to="todo-edit-modal" v-if="!item.isCompleted">
            <div class="modal todo-edit-modal" :class="{'show': showEditModal}">
                <div class="modal__dialog">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__header__title">
                                <span 
                                    class="modal__header__title__priority todo-item__priority"
                                    :class="{'--on': item.hasPriority}"
                                ></span>
                                <div class="modal__header__title__body">Task</div>
                            </div>
                            <Button class="modal__header__close" @click.native="closeEditModal">
                                <i class="modal__button-sign plus plus--x"></i>
                            </Button>
                        </div>
                        <div class="modal__body">
                            {{ item.text }}
                        </div>
                        <div class="modal__footer">
                            <Button class="todo-edit-modal__btn-delete" @click.native="deleteItem(item.id)">
                                <img src="../../assets/icon-trash.svg" width="16" />
                            </Button>
                            <Button class="btn-green" @click.native="setCompleted(item)">Complete</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal__backdrop"></div>
        </portal>
    </div>
</template>

<script>
import Button from '../UI/Button.vue'

export default {
    props: ['item'],
    components: {
        Button
    },
    data(){
        return {
            showEditModal: false
        }
    },
    methods: {
        deleteItem(itemId){
            const vm = this;
            const todo = vm.$store.getters.todos.find(el => el.id == itemId);
            vm.$store.dispatch('deleteToDo', todo);
            vm.closeEditModal();
        },
        setCompleted(item){
            item.isCompleted = true;
            this.closeEditModal();
        },
        switchCompleted(item, event){
            item.isCompleted = event.target.checked;
        },
        openEditModal(event, item){
            if( window.innerWidth >= 992 ){
                return
            }
            if( !item.isCompleted ){
                event.preventDefault();
                this.showEditModal = true;
            }
        },
        closeEditModal(){
            this.showEditModal = false;
        }
    }
}
</script>

<style lang="scss">
    .todo-item {
        background-color: $blue-1;
        color: $blue-light-4;
        padding: 19px 20px;
        border-radius: 12px;
        margin-top: 10px;
        margin-bottom: 15px;
        cursor: pointer;
        transition: all 0.15s linear;

        &__inner {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            &-body {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            input[type="checkbox"] {
                position: absolute;
                margin: 0;
                padding: 0;
                cursor: pointer;
                opacity: 0;

                ~ label {
                    cursor: pointer;
                    position: relative;
                    padding-left: 25px;
                    padding-right: 10px;

                    &:before {
                        cursor: pointer;
                        content: '';
                        display: inline-block;
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        border: 1px solid $blue-light-4;
                        border-radius: 4px;
                        background-color: transparent;
                    }
                }
                &:focus,
                &:hover {
                    ~ label {
                        &:before {
                            background-color: $blue-2;
                        }
                    }
                }
                &:checked ~ label {
                    .todo-item__text {
                        text-decoration: line-through;
                        color: $blue-5;
                    }
                    &:before {
                        background-color: $green-1;
                        border-color: $green-1;
                    }
                    &:after {
                        content: '\2714';
                        position: absolute;
                        left: 4px;
                        font-size: 0.85em;
                        color: $green-2;
                    }
                }
            }
        }
        &__delete {
            transition: opacity 0.15s linear;
            opacity: 0;
            background-color: transparent;
            border: 0 none;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            line-height: 0;
        }
        &__priority {
            width: 10px;
            height: 10px;
            margin: 0 13px;
            border-radius: 100px;
            background-color: #425277;
            flex-shrink: 0;

            &.--on {
                background-color: $red-1;
            }
        }
        @media (min-width: 992px) {
            cursor: default;

            &:hover {
                box-shadow: 0 8px 18px 0 rgba(0,0,0,0.16);

                .todo-item__delete {
                    opacity: 1;
                }
            }
        }
    }

    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        justify-content: center;
        flex-direction: column;

        &__backdrop {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background-color: rgba(#020713, 0.9);
        }
        &__dialog {
            margin: 35px;
        }
        &__content {
            border-radius: 12px;
            background-color: $blue-1;
            color: $blue-light-4;
        }
        &__header,
        &__body,
        &__footer {
            padding: 20px 25px;
        }
        &__header {
            border-bottom: 1px solid #1F2942;
            display: flex;

            &__title {
                flex: 1;
                display: flex;
                align-items: center;

                &__priority {
                    margin-left: 0;
                    margin-right: 10px;
                }
                &__body {
                    flex: 1;
                }
            }
            &__close {
                flex-shrink: 0;
                padding: 0;
                min-height: auto;
            }
        }
        &__body {
            font-size: 18px;
        }
        &__footer {
            padding-bottom: 25px;
            display: flex;
            justify-content: space-between;
        }

        &.show {
            display: flex;

            + .modal__backdrop {
                display: block;
            }
        }
    }
    .todo-edit-modal {
        padding-bottom: 60px;

        &__btn-delete {
            width: 40px;
            min-height: 40px;
            padding: 0;
            background-color: $blue-3;
        }
    }
    @media (min-width: 992px) {
        .todo-edit-modal {
            display: none !important;

            + .modal__backdrop {
                display: none !important;
            }
        }
    }
</style>
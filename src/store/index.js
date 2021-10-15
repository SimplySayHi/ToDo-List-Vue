import Vue from 'vue';
import Vuex from 'vuex';
import ToDoList from '../data/ToDoList';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: ToDoList
    },
    mutations: {
        'ADD_TODO'(state, todo){
            state.todos.push(todo);
        },
        'DELETE_TODO'(state, todo){
            state.todos.splice(state.todos.indexOf(todo), 1);
        }
    },
    actions: {
        addToDo: ({commit}, todo) => {
            commit('ADD_TODO', todo);
        },
        deleteToDo: ({commit}, todo) => {
            commit('DELETE_TODO', todo);
        }
    },
    modules: {},
    getters: {
        todos(state){
            return state.todos;
        }
    }
});

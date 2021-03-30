import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = [];
const actions = {
    populateToDos(todos) {
        return {
            type: 'POPULATE_TODOS',
            todos,
        };
    },
    *addToDo(item) {
        const response = yield {
            type: 'ADD_TODO_REQUEST',
            item,
        };

        return {
            type: 'ADD_TODO',
            item: response,
        };
    },
    fetchTodos() {
        return {
            type: 'FETCH_TODOS',
        };
    },
    *toggleTodo(todo, index) {
        yield {
            type: 'UPDATE_TODO',
            index,
            todo: { ...todo, loading: true },
        };
        const response = yield {
            type: 'TOGGLE_TODO',
            todo,
        };

        return {
            type: 'UPDATE_TODO',
            index,
            todo: response,
        };
    },
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.item];
        case 'POPULATE_TODOS':
            return [...action.todos];
        case 'UPDATE_TODO': {
            let stateCopy = [...state];
            stateCopy[action.index] = action.todo;
            return stateCopy;
        }
        default:
            return state;
    }
};

const selectors = {
    getTodos(state) {
        return state;
    },
    getToDosNumber(state) {
        return state.length;
    },
    getUnDoneToDosNumber(state) {
        return state.filter((todo) => !todo.completed).length;
    },
    getDoneToDosNumber(state) {
        return state.filter((todo) => todo.completed).length;
    },
};

registerStore('mytheme-blocks/todo', {
    reducer,
    selectors,
    actions,
    controls: {
        ADD_TODO_REQUEST({ item }) {
            return fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((response) => response.json());
        },
        FETCH_TODOS() {
            return fetch(
                'https://jsonplaceholder.typicode.com/todos?_limit=10'
            ).then((response) => response.json());
        },
        TOGGLE_TODO({ todo }) {
            return fetch(
                `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: !todo.completed,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            ).then((response) => response.json());
        },
    },
    resolvers: {
        *getTodos() {
            const todos = yield actions.fetchTodos();
            return actions.populateToDos(todos);
        },
    },
});

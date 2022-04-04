const initialState = {
    todoList: [
        {
            title: 'Task One',
            id: "1"
        }
    ]

}
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO": {
            return {
                ...state,
                todoList: [...state.todoList, action?.payload]
            }
        }
        case "DELETE_TODO": {
            return {
                ...state,
                todoList: state.todoList.filter((item) => item.id !== action.payload.id)
            }
        }
        case "EDIT_TODO": {
            return {
                ...state,
                todoList: state.todoList.map((item) => {
                    if (item.id == action.payload.id) {
                        return {
                            ...item, title: action.payload.title
                        }
                    }
                    else {
                        return item;
                    }
                })
            }
        }

        case "DELETE_ALL_TODO": {
            return {
                ...state,
                todoList: []
            }
        }
        default: {
            return state
        }
    }
}

export default todoReducer


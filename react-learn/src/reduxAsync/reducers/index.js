/*
 * @Author: your name
 * @Date: 2021-01-04 17:28:14
 * @LastEditTime: 2021-01-05 17:58:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\reducers\index.js
 */
import { combineReducers } from 'redux'
const state = {
    type: 'A',
    student: [
        {
            id: '0',
            name: 'zhangsan',
            sge: 18
        },
        {
            id: '1',
            name: 'lisi',
            sge: 18
        }
    ],
    teacher: [
        {
            id: '0',
            name: 'wang',
            age: 30
        },
        {
            id: '1',
            name: 'liu',
            age: '29'
        }
    ]
}

export const ADD_A = 'ADD_A';
export const ADD_B = 'ADD_B';
export const DEL_A = "DEL_A";
export const DEL_B = "DEL_B";
export const UPDATE = 'UPDATE'

export const SHOW = 'SHOW';


export const student = (state = [], action) => {
    switch (action.type) {
        case ADD_A:
            const id = state.map(item => {
                return item.id
            }).indexOf(action.val.id)
            if (id) {
                return [...state, action.val]
            }

        case DEL_A:
            return state.filter(item => {
                return !(item.id === action.val.id)

            })

        case UPDATE:

            return state.map(item => {
                item.id === action.val.id && (item = action.val);
                return item
            })

        default:
            return state
    }

}


export const teacher = (state = [], action) => {
    switch (action.type) {
        case ADD_B:
            const id = state.map(item => {
                return item.id
            }).indexOf(action.val.id)
            if (id) {
                return [...state, action.val]
            }

        case DEL_B:
            return state.filter(item => {
                return !(item.id === action.val.id)

            })

        case UPDATE:

            return state.map(item => {
                item.id === action.val.id && (item = action.val);
                return item
            })

        default:
            return state
    }
}


export const type = (state = 'A', action) => {
    switch (action.type) {
        case SHOW:

            return action.class

        default:
            return state
    }
}


export const reducers = combineReducers(
    {
        type,
        student,
        teacher
    }
)
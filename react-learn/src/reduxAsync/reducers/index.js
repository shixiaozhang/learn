/*
 * @Author: your name
 * @Date: 2021-01-04 17:28:14
 * @LastEditTime: 2021-01-04 17:54:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\reducers\index.js
 */
const state = {
    class: 'A',
    item: [
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
    item2: [
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
const ADD_A = 'ADD_A';
const ADD_B = 'ADD_B';
const DEL_A = "DEL_A";
const DEL_B = "DEL_B";
const UPDATE = 'UPDATE'
const SHOW = 'SHOW';
const add = (state = [], action) => {
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
               return !(item.id === action.val.id )
               
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



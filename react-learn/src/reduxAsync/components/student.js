/*
 * @Author: your name
 * @Date: 2021-01-05 14:03:17
 * @LastEditTime: 2021-01-05 14:07:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\components\student.js
 */

export default function Student(props){
    return (
        <div>
            {
                props.info.map(item=>{
                    <p key={item.di}>
                        <span>{item.name}</span>
                        <span>{item.age}</span>
                    </p>
                })
            }
        </div>
    )
}
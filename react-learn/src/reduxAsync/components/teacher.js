/*
 * @Author: your name
 * @Date: 2021-01-05 14:06:29
 * @LastEditTime: 2021-01-05 14:07:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react-learn\src\reduxAsync\components\teacher.js
 */

  function teacher(props){
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
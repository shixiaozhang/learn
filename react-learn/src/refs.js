// refs 转发

import React from 'react'



const Fors=React.forwardRef((props,ref)=>(
    <input type="text" ref={ref} {...props}/>
)
   
)
const cref=React.createRef()
function Refffff(){
    function change(e){
        console.log(e);
        console.log(cref.current.value);
    }
    return (
        <Fors ref={cref} onChange={change} ></Fors>
    )
}
export default Refffff
import { BasicProps } from '../type/type'

function Other(props: BasicProps) {
    console.log(props);
    
    return <div>
        {
           JSON.stringify( props)
        }
    </div>
}

export default Other
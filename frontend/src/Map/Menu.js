import React from 'react';
import './Query.ts'
function Menu() {
    const [input, setInput] = React.useState("")
    React.useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Input updated")
        }, 2000)
        return () => clearTimeout(timer)
    }, [input])
    function handleInputChange(e) {
        setInput(e.target.value) //state management
    }
    return (<div>
        <form>
            <label>
                <div style={{backgroundColor: '#d3d3d3'}}>Input a job name... </div>
                <input type="text" name="na"></input>
            </label>
        </form>
    </div>)
}
export default Menu
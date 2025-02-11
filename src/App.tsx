import { createContext, useState } from 'react'
import './App.css'

// 

// different component types will have different interfaces

// number: ComponentType

// maybe I create 

// interface Component {
//   id: number;
//   parent_id: number;
//   children: number[];
//   component_type: number;
// }
// interface PageContextProps {
//   components: 
// }

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>Hi!</div>
  )
}

// export const PageContext = createContext()

export default App


import { useContext } from "react";

// Trailing comma is to avoid "JSX element has no corresponding closing tag." parsing error.
const useCustomContext = <T,>(context : React.Context<T | undefined>) => {
    const data = useContext(context);
    if (data === undefined) {
        // Throws an error if context is missing, e.g. if the component that uses the context is outside the boundaries of the context provider. 
        throw new Error('Context is undefined!');
    }
    return data;
  }

export default useCustomContext;
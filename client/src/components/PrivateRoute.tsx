import { useReducer } from "react";

export default function PrivateRoute({ component: Component, ...rest }) {
    const [state, dispatch] = useReducer(reducer, {isAut})
  return <div>PrivateRoute</div>;
}

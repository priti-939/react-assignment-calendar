import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
       <div>
        Oooops! something went wrong
        <p>{err.status}</p>
        <p>{err.statusText}</p>
       </div>
    );
}

export default Error;
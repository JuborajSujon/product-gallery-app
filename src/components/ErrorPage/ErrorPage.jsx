import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="min-h-screen flex justify-center items-center flex-col text-center">
      <h1 className="text-3xl md:text-5xl mb-4">Oops!</h1>
      <p className="text-lg md:text-2xl">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-lg md:text-2xl mt-3 md:mt-5">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;

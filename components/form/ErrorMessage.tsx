interface ErrorMessageProps {
  errormessage?: string;
}

const ErrorMessage = ({ errormessage }: ErrorMessageProps) => {
  if (!errormessage) {
    return null;
  }

  return <p className="text-red-500 text-sm w-full my-1">{errormessage}</p>;
};

export default ErrorMessage;

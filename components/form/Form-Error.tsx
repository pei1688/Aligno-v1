interface ErrorMessageProps {
  errormessage?: string;
}

const ErrorMessage = ({ errormessage }: ErrorMessageProps) => {
  if (!errormessage) {
    return null;
  }

  return <p className="my-1 w-full text-sm text-red-500">{errormessage}</p>;
};

export default ErrorMessage;

type ErrorAuthProps = {
  errMsg: string;
};
export const ErrorAuth: React.FC<ErrorAuthProps> = ({ errMsg }) => {
  return <div className="text-sm font-semibold text-red-500">{errMsg}</div>;
};

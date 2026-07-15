import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../store/authApi";
import { setCredentials, setInitialized } from "../store/authSlice";
import { type RootState } from "../../../store";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const AuthLoader = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  // Skip the query if we're already initialized (though on mount it'll be false)
  const { data, isLoading, isError, isSuccess } = useGetMeQuery(undefined, {
    skip: isInitialized,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data.data }));
    } else if (isError || (!isLoading && !data && !isInitialized)) {
      dispatch(setInitialized());
    }
  }, [data, isSuccess, isError, isLoading, dispatch, isInitialized]);

  if (!isInitialized && isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-950 z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-slate-500">Checking session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLoader;

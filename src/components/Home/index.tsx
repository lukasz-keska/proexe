import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../../store/reducers/app.reducer';
import { RootState } from '../../store/reducers/root.state';
import UsersTable from '../UsersTable';

const HomeComponent: FunctionComponent = () => {
  const isLoaded = useSelector((st: RootState) => st.appList.loaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      const cancelToken = fetchApiData(dispatch);
      return () => cancelToken.cancel();
    }
  }, [isLoaded]);
  return <div className="app-body">{isLoaded && <UsersTable />}</div>;
};

export default HomeComponent;

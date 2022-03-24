import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../../store/reducers/app.reducer';
import { RootState } from '../../store/reducers/root.state';

const HomeComponent: FunctionComponent = () => {
  const isLoaded = useSelector((st: RootState) => st.appList.loaded);
  const users = useSelector((st: RootState) => st.appList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('LOAD DATA', isLoaded, users);
    const cancelToken = fetchApiData(dispatch);
    return () => cancelToken.cancel();
  }, []);

  // const userListTable = useMemo(() => {

  // },[isLoaded]);

  return <div></div>;
};

export default HomeComponent;

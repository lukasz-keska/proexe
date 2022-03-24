import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'rc-table';
import { fetchApiData } from '../../store/reducers/app.reducer';
import { RootState } from '../../store/reducers/root.state';

const HomeComponent: FunctionComponent = () => {
  const isLoaded = useSelector((st: RootState) => st.appList.loaded);
  const users = useSelector((st: RootState) => st.appList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      console.log('LOAD DATA?', isLoaded, users);
      const cancelToken = fetchApiData(dispatch);
      return () => cancelToken.cancel();
    }
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 200
    },
    {
      title: 'Edit',
      dataIndex: '',
      key: 'edit',
      render: () => <a href="#">Edit</a>
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'delete',
      render: () => <a href="#">Delete</a>
    }
  ];

  return (
    <div>
      <Table columns={columns} data={users} emptyText="Records not found" />
    </div>
  );
};

export default HomeComponent;

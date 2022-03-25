import { FunctionComponent, MouseEvent } from 'react';
import Table from 'rc-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/reducers/root.state';
import { UserDataInterface } from '../../store/models/app.model';
import { deleteUserFromResults } from '../../store/actions/app.actions';

const UsersTableComponent: FunctionComponent = () => {
  const users = useSelector((st: RootState) => st.appList.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (ev: MouseEvent<HTMLButtonElement>) => {
    const id = ev.currentTarget.dataset.testid;
    dispatch(deleteUserFromResults(Number(id)));
  };

  const handleEdit = (ev: MouseEvent<HTMLButtonElement>) => {
    const id = ev.currentTarget.dataset.testid;
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/add');
  };

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
      render: (usr: UserDataInterface) => {
        return (
          <button data-testid={usr.id} onClick={handleEdit}>
            Edit
          </button>
        );
      }
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'delete',
      render: (usr: UserDataInterface) => {
        return (
          <button data-testid={usr.id} onClick={handleDelete}>
            Delete
          </button>
        );
      }
    }
  ];

  return (
    <div className="users-table" data-testid="usersTable">
      <h3>Users table</h3>
      <button onClick={handleAdd}>Add new user</button>
      <Table columns={columns} data={users} emptyText="Records not found" />
    </div>
  );
};

export default UsersTableComponent;

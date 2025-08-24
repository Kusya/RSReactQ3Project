import { useSelector } from 'react-redux';
import { selectUsers } from '../store/authorizationDataSlice';
import UserTile from './UserTile';

export default function UserGrid() {
  const users = useSelector(selectUsers);

  if (users.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">No users submitted yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {users.map((user) => (
        <UserTile key={user.id} user={user} />
      ))}
    </div>
  );
}

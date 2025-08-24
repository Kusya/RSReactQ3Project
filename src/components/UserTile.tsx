import { type User } from '../types/User';

interface UserTileProps {
  user: User;
}

export default function UserTile({ user }: UserTileProps) {
  return (
    <div className="border border-gray-600 rounded-md p-4 bg-gray-800 text-white shadow-md">
      {user.image && (
        <img
          src={user.image}
          alt={`${user.name}'s avatar`}
          className="w-24 h-24 object-cover rounded-full mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm">Email: {user.email}</p>
      <p className="text-sm">Gender: {user.gender}</p>
      <p className="text-sm">Country: {user.country}</p>
      <p className="text-sm">Age: {user.age}</p>
    </div>
  );
}

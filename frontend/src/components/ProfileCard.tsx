"use client";

interface ProfileCardProps {
  username: string;
  email?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ username, email }) => {
  return (
    <div className="p-4 border rounded-lg shadow flex flex-col items-start bg-white dark:bg-gray-800">
      <p className="font-bold">{username}</p>
      {email && <p className="text-sm text-gray-500">{email}</p>}
    </div>
  );
};

export default ProfileCard;

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
          <img src="/public/player.png" alt="Logo" className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">MusicStream</h1>
          <p className="text-xs text-gray-300">Your Personal Music Library</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded">
            <span className="text-sm font-medium">{user.username}</span>
            <span className="text-xs bg-purple-600 px-2 py-0.5 rounded-full">
              {user.role}
            </span>
          </div>
        )}

        <button
          onClick={logout}
          className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 transition"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;

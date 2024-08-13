import { LaptopMinimal, Moon, Sun } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const AvatarDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply theme based on state
  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.classList.remove('dark');
      return;
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    toast.success("Logout Berhasil");
    window.location.href = "/";
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex items-center gap-x-3">
      <h1 className="text-sm font-medium dark:text-white">{user.nama_lengkap}</h1>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img
              className="w-8 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Avatar Image"
            />
          </button>
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <a
                href="#profile"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Your Profile
              </a>
              <a
                href="#settings"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
              >
                Settings
              </a>
              <div className="py-1" role="none">
                <span
                  className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                >
                  Theme
                </span>
                <div className="px-4 py-2 flex items-center gap-x-2">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className="text-gray-700 block text-sm hover:bg-gray-100 p-1 rounded-md"
                  >
                    <Sun className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className="text-gray-700 block text-sm hover:bg-gray-100 p-1 rounded-md"
                  >
                    <Moon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className="text-gray-700 block text-sm hover:bg-gray-100 p-1 rounded-md"
                  >
                    <LaptopMinimal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-2"
                onClick={handleLogout}
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarDropdown;

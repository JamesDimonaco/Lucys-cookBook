import React from "react";

export interface MenuItemProps {
  icon: string;
  title: string;
  action: () => void;
  isActive?: () => boolean;
  type?: "divider";
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  action,
  isActive = () => false,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    action();
    console.log(action);
  };

  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${
        isActive() ? "text-blue-600 bg-blue-100" : ""
      }`}
      onClick={handleClick}
      title={title}
    >
      {/* <svg className="w-5 h-5">
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
      </svg> */}
      <span>{title}</span>
    </button>
  );
};

export default MenuItem;

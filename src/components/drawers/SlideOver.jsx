import { useState } from "react";

const SlideOver = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSlideOver = () => {
    setIsOpen(true);
  };

  const closeSlideOver = () => {
    setIsOpen(false);
  };

  return (
    <div className="drawer drawer-end drawer-close">
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SlideOver;

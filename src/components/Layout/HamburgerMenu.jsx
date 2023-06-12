import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { handleOpenSidebar } from "../../store/layout";

const HamburgerMenu = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(handleOpenSidebar({ removeFromSession: true }))}
      type="button"
      className="rounded-btn mr-auto bg-neutral text-neutral-content p-2 hover:bg-neutral-focus hover:text-neutral-content"
    >
      <AiOutlineMenu className="text-sm" />
    </button>
  );
};

export default HamburgerMenu;

import React from "react";

interface SidebarProps {
    position: "left" | "right";
}

const Sidebar: React.FC<SidebarProps> = ({ position }) => {
    return (
        <aside
            className={`${
                position === "left" ? "white" : "bg-green-200"
            } w-1/4 p-4`}
        >
            <p>{position === "left" ? "채팅방 목록" : "채팅방 멤버"}</p>
            <div>
                {position === "left" ? "채팅방1" : "한종승"}
            </div>
            <div>
                {position === "left" ? "채팅방2" : "이민구"}
            </div>
            <div>
                {position === "left" ? "" : "신정엽"}
            </div>
        </aside>
    );
};

export default Sidebar;

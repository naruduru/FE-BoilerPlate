import React from "react";

interface SidebarProps {
    position: "left" | "right";
}

const Sidebar: React.FC<SidebarProps> = ({ position }) => {
    return (
        <aside
            className={`${
                position === "left" ? "bg-custom-gold-50" : "bg-custom-gold-50"
            }  border-x-4 border-custom-gold w-1/4`}
        >
            <p className="p-2 pl-4">{position === "left" ? "채팅" : "대화상대"}</p>
            <hr className="border-custom-gold-75 border-1"/>
            <div className="pt-2 pl-2">
                {position === "left" ? "한종승" : "한종승"}
            </div>
            <div className="pt-2 pl-2">
                {position === "left" ? "신정엽, 한종승 3" : "이민구"}
            </div>
            <div className="pt-2 pl-2">
                {position === "left" ? "점심방 3" : "신정엽"}
            </div>
            <div className="pt-2 pl-2 truncate">
                {position === "left" ? "신정엽, 한종승, 고선지, 이광민 6" : "신정엽"}
            </div>
        </aside>
    );
};

export default Sidebar;

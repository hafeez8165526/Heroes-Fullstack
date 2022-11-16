import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import react from "react";
import { FaGem,FaHeart } from "react-icons/fa";
export default function Leftbar({ children }) {

  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem icon={<FaGem />}>Home</MenuItem>
        <SubMenu title="Components" icon={<FaHeart />}>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          
        </SubMenu>
      </Menu>
    </ProSidebar>
  )
}

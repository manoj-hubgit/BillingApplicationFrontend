import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { MdAddBox, MdEdit } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsFileBarGraphFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signOut } from "../Redux/Slice/UserSlice";

const SideBar = () => {
  const path = useLocation().pathname;
  const navigate=useNavigate();
  const dispatch=useDispatch();
const handleSignout=()=>{
  localStorage.removeItem("token");
  dispatch(signOut());
  navigate("/signin");
}
    
  return (
    <Sidebar className="h-auto w-16 sm:w-64">
      <Sidebar.Logo className="hidden sm:block">BillHub</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup as={"div"}>
          <Link to="/allproduct">
            <Sidebar.Item
              active={path === "/allproduct"}
              icon={HiChartPie}
              as={"div"}
            >
              <span className="hidden sm:block">All Products</span>
            </Sidebar.Item>
          </Link>
          <Link to="/addproduct">
            <Sidebar.Item
              icon={MdAddBox}
              active={path === "/addproduct"}
              as={"div"}
            >
              <span className="hidden sm:block">Add Products</span>
            </Sidebar.Item>
          </Link>
          <Link to="/editproduct">
            <Sidebar.Item
              icon={MdEdit}
              active={path === "/editproduct"}
              as={"div"}
            >
              <span className="hidden sm:block">Edit Products</span>
            </Sidebar.Item>
          </Link>
          <Link to="/reports">
            <Sidebar.Item
              icon={BsFileBarGraphFill}
              active={path === "/reports"}
              as={"div"}
            >
              <span className="hidden sm:block">Report</span>
            </Sidebar.Item>
          </Link>
          <Link to="/settings">
            <Sidebar.Item
              icon={IoIosSettings}
              active={path === "/settings"}
              as={"div"}
            >
              <span className="hidden sm:block">Settings</span>
            </Sidebar.Item>
          </Link>
          
          <div onClick={handleSignout}>
             <Sidebar.Item
              icon={RiLogoutBoxFill}
              // active={path === ""}
              as={"div"}
            >
              <span className="hidden sm:block">Signout</span>
            </Sidebar.Item>
          </div>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;

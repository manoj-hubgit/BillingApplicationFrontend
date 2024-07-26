"use client";
import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import "../App.css"
import { MdAddBox, MdEdit } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsFileBarGraphFill } from "react-icons/bs";
const SideBar = () => {
  return (
    <Sidebar className="sidebar">
      <Sidebar.Logo>BillHub</Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup as={'div'}>
          <Link to="/allproduct" >
            <Sidebar.Item icon={HiChartPie} as={'div'}>All Products</Sidebar.Item>
          </Link>
          <Link to="/addproduct">
            <Sidebar.Item icon={MdAddBox} as={'div'}>Add Products</Sidebar.Item>
          </Link>
          <Link to="/editproduct">
            <Sidebar.Item icon={MdEdit} as={'div'}>Edit Products</Sidebar.Item>
          </Link>
          <Link to="/report">
            <Sidebar.Item icon={BsFileBarGraphFill} as={'div'}>Report</Sidebar.Item>
          </Link>
          <Link to="">
            <Sidebar.Item icon={IoIosSettings} as={'div'}>Settings</Sidebar.Item>
          </Link>
          <Link to="">
            <Sidebar.Item icon={RiLogoutBoxFill} as={'div'}>Signout</Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;

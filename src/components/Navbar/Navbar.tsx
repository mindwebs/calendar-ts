import React, { useState } from "react";
import "./Navbar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Header } = Layout;

export default function Navbar({ collapsed, setCollapsed }: any) {
  return (
    <>
      <Header className="site-layout-background navbar" style={{ padding: 0 }}>
        <span className="trigger" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </Header>
    </>
  );
}

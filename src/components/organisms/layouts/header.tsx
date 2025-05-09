"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import iconFarmmerce from "../../../../public/farmmerce-iconic.svg";
import { useRouter } from "next/navigation";
import { setUser } from "@/app/stores/auth";
import Hamburger from "@/components/ui/Hamburger";
import SearchBar from "@/components/ui/SearchBar";
import { $cartTotalItems } from "@/app/stores/products/cartStores";
import { useStore } from "@nanostores/react";
import CartModal from "@/components/popups/CartModal";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface HamburgerButtonProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HamburgerButtonProps) => {
  const router = useRouter();
  const totalItems = useStore($cartTotalItems);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("user");

    document.cookie = "auth_token=; max-age=0; path=/";

    setUser(null);

    router.replace("/login");
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 z-40 w-full">
      <AppBar position="static" sx={{ backgroundColor: "#1E2939" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            className="flex h-[70px] w-full items-center justify-between"
          >
            <div className="flex items-center gap-3 duration-150">
              <Hamburger
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />
              <Image src={iconFarmmerce} alt={"farmmerce-icon"} width={35} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "inter",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Farmmerce
              </Typography>
            </div>

            <Box
              sx={{ flexGrow: 0 }}
              className="flex items-center gap-2 md:gap-4"
            >
              <div className="hidden md:block">
                <SearchBar />
              </div>

              <div
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-[2px] border-[#404957]"
                onClick={handleToggleModal}
              >
                <Image
                  src="/ic_cart.svg"
                  width={28}
                  height={28}
                  alt="cart icon"
                />
                {totalItems > 0 && (
                  <div className="absolute -top-3 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {totalItems}
                  </div>
                )}
              </div>

              <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-[2px] border-[#404957]">
                <Image
                  src="/ic_notification.svg"
                  width={25}
                  height={25}
                  alt="notification icon"
                />
                <div className="absolute -top-3 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  3
                </div>
              </div>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === "Logout") {
                        handleLogout();
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CartModal isOpen={isModalOpen} onClose={handleToggleModal} />
    </div>
  );
};

export default Header;

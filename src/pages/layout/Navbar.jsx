import logo from "../../assets/user_logo.png";
import DotMenu from "./DotMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <nav className="h-[40px] w-full  flex border-b shadow-sm">
      <div className="flex items-center justify-between w-full ml-3 mr-3 ">
        <DotMenu />
        {ProfileMenu()}
      </div>
    </nav>
  );
}

export default Navbar;

function ProfileMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-8 h-8 overflow-hidden rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={logo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        onClick={(e) => {
          // e.preventDefault();
          navigate('/system')
        }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("authUser");
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

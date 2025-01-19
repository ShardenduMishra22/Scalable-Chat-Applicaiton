/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, LogOut, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";

interface User {
  displayName: string;
  photos?: { value: string }[];
  emails?: { value: string }[];
}

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => { 
    axios.get(`${import.meta.env.VITE_SERVER_URL}`, { withCredentials: true })
    .then((response) => {
      const data = response.data as { isAuthenticated: boolean; user: any};
      if (data.isAuthenticated) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/logout`, { withCredentials: true }).then(() => {
        setUser(null);
        localStorage.removeItem('user');
        window.location.reload();
        navigate('/');
    });
  };

  const NavLinks = () => (
    <>
      <Link to="/home" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
    </>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-background'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Tele-Chat
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarImage 
                        src={user.photos?.[0]?.value} 
                        alt={user.displayName} 
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                        {user.displayName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.emails?.[0]?.value}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`}>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="gap-2 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  Log-In/Sign-Up
                </Button>
              </a>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-8">
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
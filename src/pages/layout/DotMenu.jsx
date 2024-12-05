import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Squares2X2Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getModules, getNavItems } from "./api";
import { useAuthenticationStore } from "../../store";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/index";

function DotMenu() {

  const navigate = useNavigate()

  const { modules } = useAuthenticationStore();

  const [isOpen, setIsOpen] = useState(false);
  
  useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
    enabled: !!isOpen
  });

  const onGetMenus = useMutation({
    mutationKey: ["menus"],
    mutationFn: getNavItems,
  });


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Squares2X2Icon className="text-gray-800 dark:text-white cursor-pointer size-6 hover:text-gray-600 dark:hover:text-gray-300" />
      </PopoverTrigger>
      <PopoverContent className="shadow-lg  w-[420px]">
        <div className="flex flex-col">
          {SearchBar()}
          <div className="flex flex-row flex-wrap gap-6 pt-3 pb-5 pl-3">
            {modules?.map((item) => (
              <button
                className="flex flex-col items-center cursor-pointer"
                key={`dotnav_${item.GCCMM_ID}`}
                onClick={() => {
                  setIsOpen(false);
                  navigate(`/${item.GCCMM_Name}/plans`)
                  onGetMenus.mutate(item.GCCMM_Name);
                }}
              >
                <Avatar className="items-center shadow-md w-16 h-16 bg-secondary  rounded-md">
                  <AvatarImage src="" />
                  <AvatarFallback className="rounded-md box-shadow-md text-4xl font-black leading-snug text-transparent font-manrope  bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 bg-clip-text bg-300% animate-gradient">
                    {item.GCCMM_Description.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                {/* <Skeleton className="w-16 h-16 rounded-md bg-slate-300" /> */}
                <div className="mt-1 text-xs font-medium text-center">
                  {item.GCCMM_Description}
                </div>
              </button>
            ))}
          </div>

          <Separator />

          {/* <div className="flex flex-row gap-6 px-3 pt-3">
            <div>
              <Skeleton className="w-16 h-16 rounded-md bg-slate-300" />

              <div className="mt-1 text-xs font-medium text-center">
                Quick Link 1
              </div>
            </div>
            <div>
              <Skeleton className="w-16 h-16 rounded-md bg-slate-300" />
              <div className="mt-1 text-xs font-medium text-center">
                Quick Link 2
              </div>
            </div>
            <div>
              <Skeleton className="w-16 h-16 rounded-md bg-slate-300" />
              <div className="mt-1 text-xs font-medium text-center">
                Quick Link 3
              </div>
            </div>
            <div>
              <Skeleton className="w-16 h-16 rounded-md bg-slate-300" />
              <div className="mt-1 text-xs font-medium text-center">
                Quick Link 4
              </div>
            </div>
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DotMenu;

function SearchBar() {
  return (
    <div className="relative w-full ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-2 py-1 pr-8 mb-2 border border-gray-200 rounded-md"
      />
      <MagnifyingGlassIcon className="absolute top-0 px-2 py-1 text-gray-400 rounded-md size-8 right-1" />
    </div>
  );
}

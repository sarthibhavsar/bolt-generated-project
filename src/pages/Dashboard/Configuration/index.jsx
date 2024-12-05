import {
  Button,
  CustomCard,
  CustomCardContent,
  CustomCardFooter,
  CustomCardHeader,
} from "../../../components/index";
import { useQuery } from "@tanstack/react-query";
import { getSubMenus } from "./api";
import {
  Cog,
  Handshake,
  HomeIcon,
  InspectionPanel,
  Key,
  PencilRuler,
  Settings2,
  Shapes,
  SquareMousePointer,
  SwatchBook,
  User,
  Workflow,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentIcon,
  CubeTransparentIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { extractBaseUrl } from "../../../helpers/utility";

const Configuration = () => {
  const navigate = useNavigate();

  const { data: submenus } = useQuery({
    queryKey: ["submenus"],
    queryFn: () => getSubMenus(window.location.pathname.split('/').splice(1)),
  });

  console.log(submenus)

  const applyIcon = (icon) => {
    switch (icon) {
      case "Home":
        return <HomeIcon className="size-8" />;
      case "CubeTransparentIcon":
        return <CubeTransparentIcon className="size-8" />;
      case "ClipboardDocumentIcon":
        return <ClipboardDocumentIcon className="size-8" />;
      case "DocumentMagnifyingGlassIcon":
        return <DocumentMagnifyingGlassIcon className="size-8" />;
      case "User":
        return <User className="size-8" />;
      case "Key":
        return <Key className="size-8" />;
      case "Cog":
        return <Cog className="size-8" />;
      case "PencilRuler":
        return <PencilRuler className="size-8" />;
      case "SwatchBook":
        return <SwatchBook className="size-8" />;
      case "Handshake":
        return <Handshake className="size-8" />;
      case "Shapes":
        return <Shapes className="size-8" />;
      case "InspectionPanel":
        return <InspectionPanel className="size-8" />;
      case "Workflow":
        return <Workflow className="size-8" />;
      case "SquareMousePointer":
        return <SquareMousePointer className="size-8" />;
      case "Settings2":
        return <Settings2 className="size-8" />;
      default:
        <ClipboardDocumentIcon className="size-8" />;
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 dark:dark">
      <CustomCard>
        <CustomCardHeader>
          <div className="flex justify-start items-center gap-2 text-xl">
            <Settings2 className="size-8" />
            Configuration
          </div>
        </CustomCardHeader>
      </CustomCard>
      <div className="flex justify-evenly items-start gap-2 flex-wrap min-h-[60vh] dark:dark">
        {(submenus || [])?.map((item) => {
          return (
            <CustomCard
              key={"item" + item.GCCUSM_ID}
              className={`config-card ${item.bg} w-[32%]  cursor-pointer border p-6 pb-0 hover:shadow-lg transition-shadow space-y-4`}
            >
              <CustomCardContent className={"flex justify-start items-center gap-4"}>
                <span className={`rounded-full p-3 border-2 ${item.bg} `}>
                  {applyIcon(item._Icon)}
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{item._Description}</span>
                  <span className="text-xs">{item.Description}</span>
                </div>
              </CustomCardContent>
              <CustomCardFooter className={'w-full flex justify-end items-center px-0'}>
                <Button 
                size="sm" 
                className=" w-1/2" 
                onClick={() => {
                  let module = extractBaseUrl(window.location.href)
                  navigate(`/${module}${item._Link}`)
                }}>
                  Explore
                </Button>
              </CustomCardFooter>
            </CustomCard>
          );
        })}
      </div>
    </div>
  );
};

export default Configuration;

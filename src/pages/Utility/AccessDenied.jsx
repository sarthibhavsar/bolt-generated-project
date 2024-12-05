import { useNavigate } from "react-router-dom";
import { Button, CustomCard, CustomCardContent } from "../../components/index";
import Image from "../../assets/AccessDenied.svg"; // Assuming you have an image in assets

const AccessDenied = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/`);
  };
  return (
    <CustomCard>
      <CustomCardContent className={"w-full h-full bg-gradient-to-r from-orange-100 via-slate-300 to-orange-100 animate-gradient bg-300%"}>
        <div className="w-full h-full text-center flex justify-center items-center flex-col gap-10 p-10">
          <img src={Image} alt="403 Access Denied" className="w-1/2 max-w-[30%] filter hue-rotate-15 sm:w-3/4 xs:w-full" />
          <span className="w-full text-6xl font-bold text-red-600 sm:text-4xl">
            403 Oops! Access Restricted!
          </span>
          <span className="w-full text-base text-gray-600 sm:text-sm">
            We’re sorry, but you don’t have the necessary permissions to access this area. Contact your admin for further assistance.
          </span>
          <Button 
            variant="destructive" 
            size="lg" 
            onClick={onNavigate}
            className="transition-transform transform hover:scale-105 sm:text-sm sm:px-4 sm:py-2"
          >
            Back to dashboard
          </Button>
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

// Ensure the following CSS is added to your stylesheet
// @keyframes gradient {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// .animate-gradient {
//   background-size: 200% 200%;
//   animation: gradient 15s ease infinite;
// }

export default AccessDenied;

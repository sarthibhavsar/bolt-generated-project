import { useNavigate } from "react-router-dom";
import { Button, CustomCard, CustomCardContent } from "../../components/index";
import Image from "../../assets/LicenceExpiry.jpg"; // Assuming you have an image in assets

const LicenceExpiry = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/`);
  };

  return (
    <CustomCard>
      <CustomCardContent className={"w-full h-full bg-gradient-to-r from-yellow-100 via-slate-300 to-yellow-100 animate-gradient bg-300%"}>
        <div className="w-full h-full text-center flex justify-center items-center flex-col gap-10 p-10">
          <img src={Image} alt="Licence Expiry" className="w-1/2 mix-blend-multiply max-w-[30%] filter hue-rotate-15" />
          <span className="w-full text-6xl font-bold text-red-600">
            Licence Expired!
          </span>
          <span className="w-full text-base text-gray-600">
            Your licence has expired. Please renew your licence or contact support.
          </span>
          <Button 
            variant="destructive" 
            size="lg" 
            onClick={onNavigate}
            className="transition-transform transform hover:scale-105"
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

export default LicenceExpiry;

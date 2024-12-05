import { useNavigate } from "react-router-dom";
import { Button, CustomCard, CustomCardContent } from "../../components";
import NotFoundImage from "../../assets/NoDataPreview.svg"; // Assuming you have an image in assets

const Page404 = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(`/`);
  };
  return (
    <CustomCard>
      <CustomCardContent className={"w-full h-full bg-gradient-to-r from-orange-100 via-slate-300 to-orange-100 animate-gradient bg-300%"}>
        <div className="w-full h-full text-center flex justify-center items-center flex-col gap-10 p-10">
          <img src={NotFoundImage} alt="404 Not Found" className="w-1/2 max-w-[30%] filter hue-rotate-15" />
          <span className="w-full text-6xl font-bold text-red-600">
            404 Page not Found!
          </span>
          <span className="w-full text-base text-gray-600">
            Sorry, we couldn’t find the page you’re looking for. Check the URL or go back to the homepage.
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

export default Page404;

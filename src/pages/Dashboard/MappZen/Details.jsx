import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Details = ({ data = {} }) => {
  return (
    <div className="w-[24.3%] transition-transform cursor-pointer hover:scale-105">
      <Link to={data.to}>
        <Card>
          <CardHeader className="font-[600] p-4">{data.title}</CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-1 pt-5">
              <span className="text-5xl font-bold">{data.value}</span>
              <span className="text-md ">{data.footer}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Details;

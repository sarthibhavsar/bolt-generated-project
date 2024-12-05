import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const CustomCard = ({ children, className }) => {
  return <Card className={`w-full ${className}`}>{children}</Card>;
};

const CustomCardHeader = ({ children, className }) => {
  return <CardHeader className={`font-bold  p-4 ${className}`}>{children}</CardHeader>;
};

const CustomCardContent = ({ children, className }) => {
  return <CardContent className={`${className}`}>{children}</CardContent>;
};

const CustomCardTitle = ({ children, className }) => {
  return <CardTitle className={`${className}`}>{children}</CardTitle>;
};

const CustomCardDescription = ({ children, className }) => {
  return <CardDescription className={`${className}`}>{children}</CardDescription>;
};

const CustomCardFooter = ({ children, className }) => {
  return <CardFooter className={`${className}`}>{children}</CardFooter>;
};

CustomCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomCardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomCardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomCardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomCardDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomCardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  CustomCard,
  CustomCardHeader,
  CustomCardContent,
  CustomCardTitle,
  CustomCardDescription,
  CustomCardFooter,
};

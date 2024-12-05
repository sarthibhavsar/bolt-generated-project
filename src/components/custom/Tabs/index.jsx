import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const CustomTabs = ({  className, defaultValue = "", ...props }) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn("w-[400]", className)} {...props} />
  );
};

const CustomTabList = ({ children, className }) => {
  return <TabsList className={className}>{children}</TabsList>;
};

const CustomTabsTrigger = ({ children, className, value = "", ...props }) => {
  return (
    <TabsTrigger value={value} className={className} {...props}>
      {children}
    </TabsTrigger>
  );
};

const CustomTabsContent = ({ children, className, value = "", ...props }) => {
  return (
    <TabsContent value={value} className={className} {...props}>
      {children}
    </TabsContent>
  );
};

CustomTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
};

CustomTabList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomTabsTrigger.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.string,
};

CustomTabsContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.string,
};

export { CustomTabs, CustomTabList, CustomTabsTrigger, CustomTabsContent };

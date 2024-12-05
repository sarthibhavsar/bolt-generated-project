import { Suspense, useContext } from "react";
import ChatBot from "./Chatbot";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import { BreadcrumbDemo } from "./BreadCrumb";

const ProtectedLayout = ({ code, children }) => {

  return (
    <div className="flex h-[100vh]  dark:bg-[#141921] bg-yellow">
      {/* <div className="border-r-2"> */}
        <SideNavbar />
      {/* </div> */}
      <div className="w-full rounded-lg overflow-hidden">
        <Navbar />
        {/* <ChatBot /> */}
          {/* <BreadcrumbDemo/> */}
        <div className="p-3 flex relative  h-[calc(100vh-40px)]   overflow-y-auto">
          {/* <div className="flex flex-row h-[calc(100vh-40px)]"> */}
            <Suspense fallback={<div>Please wait while its loading......</div>}>
              {children}
            </Suspense>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

const NonProtectedLayout = ({ children }) => {
  return (
    <div className="min-h-[100vh] bg-slate-100">
      <Suspense fallback={<div>Please wait while it&apos;s loading......</div>}>
        {children}
      </Suspense>
    </div>
  );
};

export { ProtectedLayout, NonProtectedLayout };

// import React from 'react';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { X, GraduationCap, Play, Book, Calendar, Users, MessageSquare, Lightbulb, Map,  UserPlus, User, Megaphone } from 'lucide-react';

// const MenuItem = ({ icon: Icon, label }) => (
//   <div className="flex flex-col items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100">
//     <Icon className="w-5 h-5 text-purple-500" />
//     <span className="text-sm">{label}</span>
//   </div>
// );

// const MenuSection = ({ title, items }) => (
//   <div className="mb-4">
//     <h3 className="mb-2 text-sm font-semibold">{title}</h3>
//     <div className="grid grid-cols-3 gap-2">
//       {items.map((item, index) => (
//         <MenuItem key={index} icon={item.icon} label={item.label} />
//       ))}
//     </div>
//   </div>
// );

// const ClickUpMenu = () => {
//   const resourceItems = [
//     { icon: GraduationCap, label: 'University' },
//     { icon: Play, label: 'Videos' },
//     { icon: Book, label: 'Help Center' },
//     { icon: Calendar, label: 'Webinar' },
//     { icon: MessageSquare, label: 'Demo' },
//     { icon: Users, label: 'Community' },
//     { icon: Book, label: 'Glossary' },
//     { icon: Lightbulb, label: 'Request a feature' },
//     { icon: Map, label: 'Onboarding' },
//   ];

//   const supportItems = [
//     { icon: UserPlus, label: 'Connect with support' },
//     { icon: UserPlus, label: 'Set Up Assistance' },
//   ];

//   const contactItems = [
//     { icon: User, label: 'Onboarding Help' },
//     { icon: User, label: 'Sales' },
//     { icon: Megaphone, label: 'Marketing and Sponsorships' },
//   ];

//   return (
//     <Card className="bg-white shadow-lg w-96">
//       <CardHeader className="flex items-center justify-between w-full p-4 text-white bg-purple-500 rounded-md">
//         <X className="cursor-pointer " />
//         <div>
//           <h2 className="text-xl font-bold">Kneo Automation</h2>
//           <p className="text-sm">Let's make the world more productive!</p>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <h2 className="mb-4 text-lg font-semibold">Resource Center</h2>
//         <p className="mb-4 text-sm text-gray-600">Get started with these tools below or see what's new</p>
//         <MenuSection title="Resource Center" items={resourceItems} />
//         <MenuSection title="Support" items={supportItems} />
//         <MenuSection title="Contact" items={contactItems} />
//       </CardContent>
//     </Card>
//   );
// };

// export default ClickUpMenu;
import React from "react";
import {
  X,
  GraduationCap,
  Play,
  Book,
  Calendar,
  Users,
  MessageSquare,
  Lightbulb,
  Map,
  UserPlus,
  User,
  Megaphone,
} from "lucide-react";

const MenuItem = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center p-2 space-x-2 rounded-md cursor-pointer hover:bg-gray-100">
    <Icon className="w-8 h-8 text-blue-500" />
    <span className="font-sans text-xs">{label}</span>
  </div>
);

const MenuSection = ({ title, items }) => (
  <div className="mb-4">
    <h3 className="mb-2 text-sm font-semibold">{title}</h3>
    <div className="grid grid-cols-3 gap-2">
      {items.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} />
      ))}
    </div>
  </div>
);

const HelpMenu = () => {
  const resourceItems = [
    { icon: GraduationCap, label: "University" },
    { icon: Play, label: "Videos" },
    { icon: Book, label: "Help Center" },
    { icon: Calendar, label: "Webinar" },
    { icon: MessageSquare, label: "Demo" },
    { icon: Users, label: "Community" },
    { icon: Book, label: "Glossary" },
    { icon: Lightbulb, label: "Request a feature" },
    { icon: Map, label: "Onboarding" },
  ];

  const supportItems = [
    { icon: Megaphone, label: "Connect with support" },
    { icon: UserPlus, label: "Set Up Assistance" },
  ];

  const contactItems = [
    { icon: User, label: "Onboarding Help" },
    { icon: User, label: "Sales" },
    { icon: Megaphone, label: "Marketing and Sponsorships" },
  ];

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md w-96">
      <div className="flex items-center justify-between px-6 py-8 text-white bg-gradient-to-r from-blue-600 to-blue-500">
        <div>
          <h2 className="text-xl font-medium">Hi Platform!</h2>
          <p className="text-sm">Let's make the world more productive!</p>
        </div>
        <X className="cursor-pointer" />
      </div>
      <div className="mx-3 -translate-y-6 bg-white border rounded-sm shadow-md ">
        <div className="p-4">
          <h2 className="mb-4 text-lg font-semibold">Resource Center</h2>
          <p className="mb-4 text-sm text-gray-600">
            Get started with these tools below or see what's new
          </p>
          <MenuSection title="" items={resourceItems} />
          <MenuSection title="Support" items={supportItems} />
          <MenuSection title="Contact" items={contactItems} />
        </div>
      </div>
    </div>
  );
};

export default HelpMenu;

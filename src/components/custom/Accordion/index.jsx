import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CustomTabList,
  CustomTabs,
  CustomTabsContent,
  CustomTabsTrigger,
} from "../Tabs";

const AccordionTabDemo = () => {
  return (
    <div className="w-full">
      <Card className="mt-3 min-h-[90vh] p-3">
        <CardTitle>
          <div className="text-center text-4xl font-bold">
            Accordion And Tab Demo
          </div>
        </CardTitle>
        <CardContent className="mt-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <CustomTabs defaultValue="account" className="w-[400px]">
            <CustomTabList className="grid w-full grid-cols-2">
              <CustomTabsTrigger value="account">Account</CustomTabsTrigger>
              <CustomTabsTrigger value="password">Password</CustomTabsTrigger>
            </CustomTabList>
            <CustomTabsContent value="account">Account</CustomTabsContent>
            <CustomTabsContent value="password">Password</CustomTabsContent>
          </CustomTabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccordionTabDemo;

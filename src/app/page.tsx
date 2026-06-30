
// import { CreateProductForm } from "@/components/forms/CreateProductForm";
// import {  CreateProductForm } from "@/components/forms/CreateProductForm";
// import ButtonComponent from "@/components/ui/ButtonComponent";
// import GetCountComponent from "@/components/ui/GetCountComponent";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";

import { CreateProductForm } from "@/components/forms/CreateProductForm";

export default function Home() {
  return (

    <div className="p-4">
      <CreateProductForm/>
       {/* <LoginButton/> */}
      
    </div>
  )
  //  <Card className="max-w-sm">
  //       <CardHeader>
  //         <CardTitle>Project Overview</CardTitle>
  //         <CardDescription>
  //           Track progress and recent activity for your Next.js app.
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         Your design system is ready. Start building your next component.
  //       </CardContent>
  //     </Card>
  //   );
}

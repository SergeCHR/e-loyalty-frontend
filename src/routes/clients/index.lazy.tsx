import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Link, createFileRoute } from "@tanstack/react-router";

import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input"
import { usePersonalizationSettingsStore } from "@/store";

export const Route = createFileRoute("/clients/")({
    component: () => <ClientCardsPage />,
  });
  
export default function ClientCardsPage() {
  const personalizationSettingsStore = usePersonalizationSettingsStore()
  console.log({personalizationSettingsStore})
  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="w-full flex gap-8 items-center">
          <Input className="w-full max-w-md" placeholder="Search for your cards..." />
          <Avatar>
            <AvatarImage alt="Profile" src="/placeholder-avatar.jpg" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card>
          <img
            alt="Bonus Offer"
            className="rounded-t-lg w-full h-48 object-cover"
            height="200"
            src="/images/red.jpg"
            style={{
              aspectRatio: "300/200",
              objectFit: "cover",
            }}
            width="300"
          />
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2" style={{color: personalizationSettingsStore.color}}>{personalizationSettingsStore.businessName}</h3>
            <p className="text-gray-500 mb-4">
           {personalizationSettingsStore.businessDescription}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">0</span>
             <Link to={"/clients/$loyaltyCardId"} params={{loyaltyCardId: "12"}}>
             <ArrowRight className="w-6 h-6 text-primary" style={{color: personalizationSettingsStore.color}}/>
             </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
  
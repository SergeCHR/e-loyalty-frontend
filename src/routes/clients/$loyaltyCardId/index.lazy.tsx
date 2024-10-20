import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

import Barcode from 'react-barcode';
import { Button } from "@/components/ui/button";
import QRCode from 'react-qr-code';
import { usePersonalizationSettingsStore } from "@/store";

export const Route = createLazyFileRoute('/clients/$loyaltyCardId/')({
  component: () => <LoyaltyCardPage/>
})

export default function LoyaltyCardPage() {
  const { history } = useRouter();
  const personalizationSettingsStore = usePersonalizationSettingsStore()
  return (
    <>
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4">
        <Button onClick={() => history.back()} size="icon" variant="ghost">
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
      </div>
      <div className="absolute top-4 right-4">
      <Dialog>
  <DialogTrigger>
  <Button size="icon" variant="ghost">
          <QrCodeIcon className="h-6 w-6" />
          <span className="sr-only">QR/Bar Code</span>
        </Button>
  </DialogTrigger>
  <DialogContent className="w-[80%] rounded-lg">
  <Tabs defaultValue="qr">
            <TabsContent value="qr">
              <div className="flex flex-col items-center justify-center gap-4 p-6">
               <QRCode
                className="w-1/2 h-1/2"
               value="{userId: 12}"
               />
                <p className="text-sm text-gray-500 dark:text-gray-400">Scan the QR code to identify your account.</p>
              </div>
            </TabsContent>
            <TabsContent value="barcode">
              <div className="flex flex-col items-center justify-center gap-4 p-6">
                <Barcode
               width={1}
               height={80}
               value="{userId: 12}"
               displayValue={false}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">Scan the barcode to identify your account.</p>
              </div>
            </TabsContent>
            <TabsList className="flex justify-center">
              <TabsTrigger value="qr">QR Code</TabsTrigger>
              <TabsTrigger value="barcode">Barcode</TabsTrigger>
            </TabsList>
          </Tabs>
  </DialogContent>
</Dialog>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="mt-4 col-span-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{personalizationSettingsStore.businessName}</h3>
              <p className="text-gray-500 dark:text-gray-400">Level: Silver</p>
            </div>
            <div className="flex items-center space-x-2">
              <GiftIcon className="h-6 w-6 text-primary" style={{color: personalizationSettingsStore.color}} />
              <span className="text-3xl font-bold">0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Bonus Transactions</h2>
        <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="rounded-lg bg-slate-200 flex items-center justify-center min-h-36">
            <p>Currently no bonus transactions</p>
          </div>
          {/* <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-lg font-medium">Test business just gave you 250 bonus points!</p>
              <p className="text-gray-500 dark:text-gray-400">June 1, 2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <GiftIcon className="h-5 w-5 text-primary" style={{color: personalizationSettingsStore.color}} />
              <span className="text-lg font-bold">250</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </>
  )
}

function ArrowLeftIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function GiftIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}

function QrCodeIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}

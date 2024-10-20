import { ArrowRight, Loader2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { Textarea } from "@/components/ui/textarea";
import { usePersonalizationSettingsStore } from "@/store";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/personalization-settings/")({
  component: () => (
    <SideNavigation>
      <PersonalizationSettingsPage />
    </SideNavigation>
  ),
});

const PersonalizationSettingsPage = () => {
  // useProtected({
  //   role: "BUSINESS",
  // });
  const personalizationSettingsStore = usePersonalizationSettingsStore();
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="w-full pl-4">
      <h1 className="text-4xl bg-transparent mt-4"><Link to="/auth/login">Personalization settings</Link></h1>
      <p className="text-lg bg-transparent mt-4 mb-8">
        Personalize how customers view your loyalty cards
      </p>
     <div className="grid grid-flow-row grid-cols-3 gap-4 mr-14">
     <Card className="col-span-2">
      <CardContent>
        
      <div className="grid grid-rows-2 gap-4">
        <div className="col-span-2">
        <h3 className="mt-4 mb-2">Select your brand image</h3>
          <DropzodeInput image={personalizationSettingsStore.mainImage} setImage={personalizationSettingsStore.setMainImage} id="dropzone-input-small"/>
        
        </div>
        <div className="row-span-1">
        <h3 className="mt-4 mb-2">Information about you</h3>
        <div>
                          <Label>Business Name</Label>
                            <Input
                              placeholder="Name here"
                              type="text"
                              value={personalizationSettingsStore.businessName}
                              onChange={e => personalizationSettingsStore.setBusinessName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="mt-4">
                          <Label>Description</Label>
                            <Textarea
                              placeholder="Tell your customers about yourself"
                              value={personalizationSettingsStore.businessDescription ?? ""}
                              onChange={e => personalizationSettingsStore.setBusinessDescription(e.currentTarget.value)}
                            />
                        </div>
        </div>
        <div className="row-span-2">
        <h3 className="mt-4 mb-6 text-center">Select your brand color</h3>
          <ColorPicker color={personalizationSettingsStore.color} setColor={personalizationSettingsStore.setColor}/>
        </div>
      </div>
      <Button onClick={() => {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 250)
          }} disabled={isLoading}>{isLoading ? <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please wait
        </> : "Update"}</Button>
      </CardContent>
     </Card>
     <Card>
      <CardHeader>
        <CardTitle>Realtime feedback</CardTitle>
        <CardDescription>Look how this will look for your clients</CardDescription>
      </CardHeader>
      <CardContent>
      <Card>
          <img
            alt="Bonus Offer"
            className="rounded-t-lg w-full h-48 object-cover"
            height="200"
            src={personalizationSettingsStore.mainImage ?? "https://generated.vusercontent.net/placeholder.svg"}
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
              <span className="text-2xl font-bold">150</span>
              <ArrowRight className="w-6 h-6" style={{color: personalizationSettingsStore.color }} />
            </div>
          </CardContent>
          </Card>
      </CardContent>
     </Card>
     </div>
      <div className="w-full pb-64" />
    </div>
  );
};

type DropzoneInputProps = {
  id: string;
  image?: string;
  setImage: (image?: string) => void;
}

const DropzodeInput = (props: DropzoneInputProps) => {
  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      props.setImage(URL.createObjectURL(newFiles[0] as any))
    }
  };
  return (
    <div 
    className="flex items-center justify-center w-full"
    onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
    >
       {props.image ? <div className="relative w-full h-full max-w-80">
        <X className="absolute right-2 top-2 w-8 h-8 text-white cursor-pointer" onClick={() => props.setImage(undefined)}/>
        <img className="rounded-lg border-2 border-gray-300" src={props.image}/> 
        </div>
       :  <label htmlFor={props.id} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
            </div>
            <input type="file" onChange={e => {
              if(!e.target.files || e.target.files.length === 0){
                return
              }
              props.setImage(URL.createObjectURL(e.target.files[0]))
            }} multiple={false} accept=".jpg,.jpeg,.png" id={props.id} className="hidden" />
        </label>}
    </div> 
    )
}

type ColorPickerProps = {
  color?: string;
  setColor: (color: string) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  
 return ( <div className="w-full flex items-center justify-center">
    <label htmlFor="color-picker">
      <div className="w-48 h-48 border-2 border-gray-300 rounded-lg" style={{backgroundColor: props.color ?? "transparent"}}/>
    </label>
    <input className="sr-only" id="color-picker" value={props.color} type="color" onChange={e => props.setColor(e.currentTarget.value)} />
  </div>)
}
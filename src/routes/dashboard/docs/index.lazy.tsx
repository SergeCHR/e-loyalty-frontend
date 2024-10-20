import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CodeBlock } from "@/components/ui/code-block";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { createFileRoute } from "@tanstack/react-router";

// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";

export const Route = createFileRoute("/dashboard/docs/")({
  // beforeLoad: protectRouteWithRole("BUSINESS"),
  component: () => (
    <SideNavigation>
      <DocumentationPage />
    </SideNavigation>
  ),
});

const DocumentationPage = () => {
  // useProtected({
  //   role: "BUSINESS",
  // });
  return (
    <ScrollArea className="w-full h-screen pl-4 max-w-[800px]">
      <h1 className="text-4xl bg-transparent mt-4">Documentation</h1>
      <p className="text-lg bg-transparent mt-4">
      Integrating your business with our loyalty system via API is a simple and effective way to automate and improve your loyalty programs. In this guide, we'll explain how to set up the integration, provide examples of how to use the API, and show you how to avoid the most common mistakes.
      </p>
      <p className="text-3xl bg-transparent mt-4">
        Step 1: Get API Key
      </p>
      <p className="text-lg bg-transparent mt-4">
      To get your API key you would need to go into settings of your loyalty system. There on the bottom you'd find the key. You can copy it and save it safely for later use in your project.
      </p>
      <p className="text-3xl bg-transparent mt-4">
        Step 2: Configure it inside of your project
      </p>
      <p className="text-lg bg-transparent mt-4">
     All examples here will be shown using JavaScript, but the setup is platform-agnostic. Thus, can be used by every backend there is.
      </p>
      <p className="text-lg bg-transparent mt-4">
     After saving your api key into your project, add it inside of your configuration, so every request, that is sent to our API has your api key. We use custom 'x-api-key', value there should match the API key you have copied from your settings.
      </p>
      <CodeBlock
        className="max-w-fit"
        text={`
import axios from 'axios';

const apiKey = 'YOUR_API_KEY';

const config = {
  //...Your configurations here
  headers: { 'x-api-key': apiKey }
};

export const apiInstance = axios.use(config);
`}
      />
        <p className="text-3xl bg-transparent mt-4">
        Step 3: Use our API endpoints to suit your needs
      </p>
      <p className="text-lg bg-transparent mt-4">
    After the setup is finished, you can now successfully send requests to our API and use our infrastracture to your needs. All possible endpoints you can find in the section below.
      </p>
      <p className="text-3xl bg-transparent mt-4">
      Additonal Steps for better understanding. API Endpoints
      </p>
      <p className="text-lg bg-transparent mt-4 mb-8">
    In the table below you can find API Endpoints that you can use.
   </p>
   <ApiEndpointsTable/>
        </ScrollArea>
  );
};

type API_ENDPOINT = {
  value: string;
  description: string;
  method: "POST"|"PUT"|"GET"|"PATCH"|"DELETE"
}

const API_ENDPOINTS: API_ENDPOINT[] = [
  { value: "/v1/auth/sign-up/unverified", description: "Create a new unverified user. (If user with such email was created it will be simply added to your business)", method: "POST" } as const,
  { value: "/v1/user", description: "Retrieve a list of users.", method: "GET" } as const,
  { value: "/v1/user/:id", description: "Retrieve information about a specific user by ID.", method: "GET" } as const,
  { value: "/v1/user/:id", description: "Update information for a specific user by ID.", method: "PATCH" } as const,
  { value: "/v1/user/:id", description: "Delete a specific user by ID.", method: "DELETE" } as const,
  { value: "/v1/bonus-transaction", description: "Create a new bonus transaction.", method: "POST" } as const,
  { value: "/v1/bonus-transaction", description: "Retrieve a list of bonus transactions.", method: "GET" } as const,
  { value: "/v1/bonus-transaction/:id", description: "Retrieve information about a specific bonus transaction by ID.", method: "GET" } as const,
  { value: "/v1/bonus-transaction/:id", description: "Update information for a specific bonus transaction by ID.", method: "PATCH" } as const,
  { value: "/v1/bonus-transaction/:id", description: "Delete a specific bonus transaction by ID.", method: "DELETE" } as const,
  { value: "/v1/business-tier", description: "Create a new business tier.", method: "POST" } as const,
  { value: "/v1/business-tier", description: "Retrieve a list of business tiers.", method: "GET" } as const,
  { value: "/v1/business-tier/:id", description: "Retrieve information about a specific business tier by ID.", method: "GET" } as const,
  { value: "/v1/business-tier/:id", description: "Update information for a specific business tier by ID.", method: "PATCH" } as const,
  { value: "/v1/business-tier/:id", description: "Delete a specific business tier by ID.", method: "DELETE" } as const,
  { value: "/v1/tier-settings", description: "Create new tier settings.", method: "POST" } as const,
  { value: "/v1/tier-settings/:id", description: "Retrieve information about specific tier settings by ID.", method: "GET" } as const,
  { value: "/v1/tier-settings/:id", description: "Update specific tier settings by ID.", method: "PATCH" } as const,
  { value: "/v1/tier-settings/:id", description: "Delete specific tier settings by ID.", method: "DELETE" } as const,
];

export default function ApiEndpointsTable() {
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>API URL</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {API_ENDPOINTS.map(endpoint => (
              <TableRow>
              <TableCell className="font-medium w-[230px]">{endpoint.value}</TableCell>
              <TableCell>{endpoint.description}</TableCell>
              <TableCell className="font-semibold">{endpoint.method}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
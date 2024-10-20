import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/clients/settings/')({
  component: () => <div>Hello /clients/settings/!</div>
})
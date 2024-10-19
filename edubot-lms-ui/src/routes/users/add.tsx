import UserAddPage from '@/pages/users/UserAddPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/add')({
  component: () => UserAddPage()
})
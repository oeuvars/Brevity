import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

const Page = async () => {
  const auth = await onAuthenticateUser()
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`)

  if (auth.status === 403 || auth.status === 400 || auth.status === 500)
    return redirect('/sign-in')
}

export default Page

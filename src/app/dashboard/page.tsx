import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation';

type Props = {}

const Page = async (props: Props) => {
  const auth = await onAuthenticateUser();
  if (auth.status === 201 || auth.status === 200) {
      return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
  }
  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
      return redirect('/sign-in')
  }
}

export default Page

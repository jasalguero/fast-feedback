import { useAuth } from '@/lib/auth'

export default function Index() {
  const auth = useAuth()

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <>
    <button onClick={(e) => auth.signinWithGitHub()}>Sign In with Github</button>
    <button onClick={(e) => auth.signinWithGoogle()}>Sign In with Google</button>
    </>
  )
}
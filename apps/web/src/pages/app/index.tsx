import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="container">
      <h1>Welcome to Next.js!</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
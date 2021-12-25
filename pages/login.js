import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";

const Login = ({ providers }) => {
  return (
    <div className="flex items-center min-h-screen justify-center bg-black w-full flex-col">
      <Head>
        <title>Spotify - Login</title>
      </Head>
      <img src="https://links.papareact.com/9xl" className="w-52 mb-5" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#1ED760] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};

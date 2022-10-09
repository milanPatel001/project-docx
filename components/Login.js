import Image from "next/image";
import { signIn } from "next-auth/react";
import Button from "@material-tailwind/react/components/Button";
function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="https://links.papareact.com/1ui"
        height="300"
        width="550"
        objectFit="contain"
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        onClick={signIn}
        ripple="light"
        variant="filled"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;

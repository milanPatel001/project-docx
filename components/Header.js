import { Button, IconButton } from "@material-tailwind/react";
import { getSession, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center sticky top-0 z-50 shadow-md bg-gray p-3">
      <Button
        color="gray"
        variant="contained"
        rounder={true}
        size="small"
        ripple="dark"
        className="h-10 px-2 mx-1"
      >
        Menu
      </Button>
      <Button
        variant="contained"
        className="mx-2"
        name="description"
        size="5xl"
        color="blue"
      />
      <div className="mx-5 md:mx-20 flex flex-grow items-center p-5 py-2 bg-gray-100 rounded-xl focus-within:text-gray-600 focus-within:shadow-md">
        <IconButton color="blue" size="sm"></IconButton>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 bg-transparent outline-none"
        />
      </div>

      <Button
        ripple="dark"
        className="ml-5 md:ml-20 l-20 w-20 border-0"
      ></Button>

      <img
        loading="lazy"
        onClick={signOut}
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session?.user?.image}
        alt=""
      />
    </div>
  );
  //add searchbar
}

export default Header;

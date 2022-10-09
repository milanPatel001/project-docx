import { useSession, getSession, signOut } from "next-auth/react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { db } from "../../firebaseconfig";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Login from "../../components/Login";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import TextEditor from "../../components/TextEditor";

function Doc() {
  const { data: session } = useSession();
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const ref = doc(db, "userDocs", session.user.email, "docs", id);
  const [snapshot, loading] = useDocumentOnce(ref);

  //redirect if user tries to access a url they do not have access to...
  if (!loading && !snapshot?.data().fileName) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          ICON
        </span>
        <div className="flex-grow px-2">
          <h2 className="">{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              File
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Edit
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              View
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Insert
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Format
            </p>
            <p className="cursor-pointer hover:bg-gray-100 transition duration-200 ease-out p-2 rounded-lg">
              Tools
            </p>
          </div>
        </div>
        <Button
          color="blue"
          variant="contained"
          className="hidden md:inline-flex h-10"
          rounded={true}
          ripple={true}
        >
          SHARE
        </Button>
        <img
          className="rounded-full cursor-pointer h-10 w-10 ml-2"
          src={session.user.image}
          alt=""
        />
      </header>
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import DocumentRow from "../components/DocumentRow";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { db } from "../firebaseconfig";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  useCollectionOnce,
  useCollection,
} from "react-firebase-hooks/firestore";

export default function Home() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  if (!session) return <Login />;

  const ref = collection(db, "userDocs", session.user.email, "docs");
  const [snapshot] = useCollection(ref);

  const createDocument = async () => {
    if (!input) return;

    const docsRef = doc(collection(db, "userDocs", session.user.email, "docs"));
    await setDoc(docsRef, { fileName: input, timestamp: serverTimestamp() });

    /*
    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: serverTimestamp(),
    });
    */

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Dialog size="sm" open={showModal} handler={() => setShowModal(!showModal)}>
      <DialogBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          color="blue"
          ripple={true}
          variant="outlined"
          onClick={(e) => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple={true}>
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
      </Head>

      <Header />
      {modal}
      <section className="pb-10 px-10 bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg">Start a new document</h2>
            <Button
              color="gray"
              variant="gradient"
              ripple={true}
              className="border-0"
            ></Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-700"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Docs</h2>
            <p className="mr-12 text-gray-700">Date Created</p>
            <p>bbb</p>
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

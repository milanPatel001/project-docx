import { useSession, getSession, signOut } from "next-auth/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { db } from "../firebaseconfig";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function TextEditor() {
  const { data: session } = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  const ref = doc(db, "userDocs", session.user.email, "docs", id);

  const [snapshot] = useDocumentOnce(ref);

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDoc(
      ref,
      { editorState: convertToRaw(editorState.getCurrentContent()) },
      { merge: true }
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
export default TextEditor;

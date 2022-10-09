import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";

export default function DocumentRow({ id, fileName, date }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer"
    >
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
    </div>
  );
}

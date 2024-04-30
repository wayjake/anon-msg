import { type MetaFunction } from "@remix-run/node";
import './styles.css'
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Thank you!" },
    { name: "description", content: "Thanks for filling out this form!" },
  ];
};

export default function Index() {
  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Thanks! </h2>
        <div className="mb-4">
          Jake looks forward to reviewing these during his break!
        </div>
        <Link to="/" className="text-underline">Send another message</Link>
      </div>
    </div>
  );
}

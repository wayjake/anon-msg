import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import './styles.css'
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = ({ params }) => {
    return [
        { title: `Message:${params.id}` },
        { name: "description", content: "Here's the first 140 characters of this message!" },
    ];
};

export async function loader({ params }: ActionFunctionArgs) {
    const message = await db.all(`SELECT * FROM messages WHERE id=${params.id}`)
    if (!message.length) {
        return new Response("Not found")
    }
    return json({ message: message[0] })
}

{/* <pre>{JSON.stringify(message, undefined, 4)}</pre> */ }


/** export default function Index() {
    const { message } = useLoaderData()
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
                <div className="bg-gradient-to-r bg-pink-400 ">@{message.username || "Anon"} says</div>
                <div className="bg-white text-gray-800"> {message.content}</div>
            </div>
        </div>
    );
}**/

export default function Index() {
    const { message } = useLoaderData();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-white">
            <div className="bg-gray-800 shadow-lg w-full max-w-md m-0 lg:max-w-sm rounded-lg">
                {/* Gradient header with dynamic text */}
                <div className="w-full p-6 leading-none bg-gradient-to-r from-pink-500 to-orange-400 text-white text-lg font-bold uppercase rounded-t-lg">
                    <span></span>@{message.username || "Anon"} says
                </div>
                {/* White section with dynamic message content */}
                <div className="bg-white text-gray-800 w-full p-6 leading-none rounded-b-lg">
                    {message.content}
                </div>
            </div>
        </div>
    );
}

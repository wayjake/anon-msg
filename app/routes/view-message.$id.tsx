import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import './styles.css'
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = ({ params, data }) => {
    return [
        { title: `@${data?.message?.username || 'Anon'} says... msg_id:${params.id}` },
        { name: "description", content: `${data?.message?.content}` },
    ];
};

export async function loader({ params }: ActionFunctionArgs) {
    const message = await db.all(`SELECT * FROM messages WHERE id=${params.id}`)
    if (!message.length) {
        return new Response("Not found")
    }
    return json({ message: message[0] })
}

export default function Index() {
    const { message } = useLoaderData();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-white">
            <div className="bg-gray-800 shadow-lg w-4/12 max-w-sm m-0 lg:max-w-sm rounded-lg text-center">
                {/* Gradient header with dynamic text */}
                <div className="w-full p-6 leading-none bg-gradient-to-r from-pink-500 to-orange-400 text-white text-lg font-bold rounded-t-lg">
                    <span className="underline">@{message.username || "Anon"}</span> says:
                </div>
                {/* White section with dynamic message content */}
                <div className="bg-white text-gray-800 w-full p-6 leading-none font-bold rounded-b-lg">
                    {message.content}
                </div>
            </div>
        </div>
    );
}

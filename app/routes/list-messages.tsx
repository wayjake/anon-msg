import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import './styles.css'
import { db } from "~/db.server";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Private Messages" },
        { name: "description", content: "These are your messages!" },
    ];
};
// http://localhost:5173/list-messages?token=superSecretPhrase
export async function loader({ request }: ActionFunctionArgs) {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')
    if (token !== "superSecretPhrase") {
        throw new Error("Unauthorized")
    }
    const messages = await db.all(`SELECT * FROM messages ORDER BY id DESC`)

    return json({ messages })
}

export default function Index() {
    const { messages } = useLoaderData()
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4">Messages </h2>
                {!messages.length && <div className="mb-4">
                    Nothing to see here, yet
                </div>}

                {messages.map(message => <Link to={`/view-message/${message.id}`} key={message.id}><div >@{message.username}: {message.content}</div></Link>)}
            </div>
        </div>
    );
}

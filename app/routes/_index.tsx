import { redirect, type MetaFunction, ActionFunctionArgs, json } from "@remix-run/node";
import './styles.css'
import { db } from "~/db.server";
import { Form, useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Send Anon Messages to Jake" },
    { name: "description", content: "You can send messages to Jake so that ONLY he can see them. Because, why not!?" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const message = formData.get('message');
  const username = formData.get('username');
  if (!message || !username) {
    return json({ error: "Please fill all required fields" })
  }
  await db.exec(`INSERT INTO messages (username, content) VALUES ('${username}', '${message}')`);
  return redirect('/thank-you');
};

export default function Index() {
  const data = useActionData()
  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Form method="POST" className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        {data?.error && <div className="bg-red-500 p-5 mb-5">{data.error}</div>}
        <h2 className="text-2xl font-bold mb-4">Send <span className="underline">@jake</span> a note</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">Your Name</label>
          <input type="text" id="username" name="username" className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg" placeholder="Enter your message"></textarea>
        </div>
        <button type="submit" className="inline-block px-5 py-2 text-white font-bold w-full bg-gradient-to-r from-pink-500 to-orange-400 rounded-md text-center shadow hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out">Send Message</button>
      </Form>
    </div>
  );
}

import { redirect } from "next/navigation";

export default function StudiosPage() {
  // Redirect to USA studios by default
  redirect("/studios/us");
}

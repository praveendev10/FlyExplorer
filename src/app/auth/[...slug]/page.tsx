// app/auth/[...slug]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllAuthPages() {
  notFound();
}

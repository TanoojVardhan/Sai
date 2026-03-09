import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const VOTE_DOC = doc(db, "votes", "summary");

async function getSummary() {
  const snap = await getDoc(VOTE_DOC);
  if (!snap.exists()) return { interested: 0, notInterested: 0 };
  const data = snap.data();
  return {
    interested: data.interested ?? 0,
    notInterested: data.notInterested ?? 0,
  };
}

export async function GET() {
  try {
    const counts = await getSummary();
    return Response.json(counts);
  } catch (err) {
    console.error("GET /api/vote error:", err);
    return Response.json({ error: "Failed to read votes" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { type } = await req.json();

    if (type !== "interested" && type !== "notInterested") {
      return Response.json({ error: "Invalid vote type" }, { status: 400 });
    }

    const snap = await getDoc(VOTE_DOC);
    if (!snap.exists()) {
      await setDoc(VOTE_DOC, { interested: 0, notInterested: 0 });
    }

    await updateDoc(VOTE_DOC, { [type]: increment(1) });

    const counts = await getSummary();
    return Response.json({ ok: true, counts });
  } catch (err) {
    console.error("POST /api/vote error:", err);
    return Response.json({ error: "Failed to save vote" }, { status: 500 });
  }
}

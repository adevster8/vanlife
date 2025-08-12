
import {
    addDoc, collection, getDocs, limit, query, serverTimestamp, where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function openOrCreateConversation(uidA: string, uidB: string) {
  // Try to find an existing convo with both users
  const q = query(
    collection(db, "conversations"),
    where("participantIds", "array-contains", uidA),
    limit(25)
  );
  const snap = await getDocs(q);
  let found: any = null;
  snap.forEach((d) => {
    const data = d.data() as any;
    if (Array.isArray(data.participantIds) && data.participantIds.includes(uidB)) {
      found = { id: d.id, ...data };
    }
  });
  if (found) return found;

  // Create a brand new conversation
  const ref = await addDoc(collection(db, "conversations"), {
    participantIds: [uidA, uidB],
    lastMessage: "",
    updatedAt: serverTimestamp(),
    // optional participant cache object:
    // participants: {
    //   [uidA]: { name: "You", avatarUrl: "" },
    //   [uidB]: { name: "Them", avatarUrl: "" },
    // },
  });
  return { id: ref.id };
}

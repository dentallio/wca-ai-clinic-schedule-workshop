import { firebaseCourseConfig } from "@/course/firebase.config";
import { isScheduleEntry } from "@/domain/schedule";
import type { ScheduleEntry } from "@/domain/types";
import { getApps, initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import type { ScheduleRepository } from "./schedule-repository";

const COLLECTION = "courseScheduleEntries";

function database() {
  const app = getApps()[0] ?? initializeApp(firebaseCourseConfig);
  return getFirestore(app);
}

function firestoreValue(entry: ScheduleEntry): Record<string, unknown> {
  const value: Record<string, unknown> = {
    id: entry.id,
    date: entry.date,
    personId: entry.personId,
    state: entry.state,
    updatedAt: entry.updatedAt,
  };
  if (entry.shiftId) value.shiftId = entry.shiftId;
  if (entry.note) value.note = entry.note;
  return value;
}

export function createFirestoreScheduleRepository(): ScheduleRepository {
  const db = database();
  return {
    mode: "firestore",
    subscribe(onEntries, onError) {
      return onSnapshot(
        collection(db, COLLECTION),
        (snapshot) => {
          const entries = snapshot.docs
            .map((item) => item.data())
            .filter(isScheduleEntry)
            .sort((a, b) => a.id.localeCompare(b.id));
          onEntries(entries);
        },
        (error) => onError(new Error(error.message)),
      );
    },
    async save(entry) {
      await setDoc(doc(db, COLLECTION, entry.id), firestoreValue(entry));
    },
    async remove(id) {
      await deleteDoc(doc(db, COLLECTION, id));
    },
    async replaceAll(entries) {
      const existing = await getDocs(collection(db, COLLECTION));
      const batch = writeBatch(db);
      existing.docs.forEach((item) => batch.delete(item.ref));
      entries.forEach((entry) => {
        batch.set(doc(db, COLLECTION, entry.id), firestoreValue(entry));
      });
      await batch.commit();
    },
  };
}

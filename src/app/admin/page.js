"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const snap = await getDoc(doc(db, "votes", "summary"));
        if (snap.exists()) {
          setVotes(snap.data());
        } else {
          setVotes({ interested: 0, notInterested: 0 });
        }
      } catch (e) {
        setError("Failed to load votes.");
      } finally {
        setLoading(false);
      }
    }
    fetchVotes();
  }, []);

  const total = votes ? (votes.interested ?? 0) + (votes.notInterested ?? 0) : 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Admin Dashboard</p>
        <h1 className={styles.title}>Vote Results</h1>
        <p className={styles.subtitle}>OnGo Instant Bath Wipes — Interest Validation</p>
      </header>

      <main className={styles.main}>
        {loading && <p className={styles.loading}>Loading votes…</p>}
        {error && <p className={styles.err}>{error}</p>}
        {votes && (
          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.cardGreen}`}>
              <span className={styles.cardLabel}>Interested</span>
              <span className={styles.cardCount}>{votes.interested ?? 0}</span>
            </div>
            <div className={`${styles.card} ${styles.cardGray}`}>
              <span className={styles.cardLabel}>Not Interested</span>
              <span className={styles.cardCount}>{votes.notInterested ?? 0}</span>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>Total Votes</span>
              <span className={styles.cardCount}>{total}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

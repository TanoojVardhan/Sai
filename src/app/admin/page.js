"use client";

import { useEffect, useState, useCallback } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDoc(doc(db, "votes", "summary"));
      if (snap.exists()) {
        setVotes(snap.data());
      } else {
        setVotes({ interested: 0, notInterested: 0 });
      }
    } catch (e) {
      setError("Failed to load votes. Check your Firebase connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVotes(); }, [fetchVotes]);

  const interested    = votes?.interested    ?? 0;
  const notInterested = votes?.notInterested ?? 0;
  const total         = interested + notInterested;
  const intPct        = total > 0 ? Math.round((interested    / total) * 100) : 0;
  const notPct        = total > 0 ? Math.round((notInterested / total) * 100) : 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Admin Dashboard</p>
        <h1 className={styles.title}>Vote Results</h1>
        <p className={styles.subtitle}>OnGo Instant Bath Wipes — Interest Validation</p>
      </header>

      <main className={styles.main}>
        {loading && <p className={styles.loading}>Loading votes…</p>}
        {error   && <p className={styles.err}>{error}</p>}

        {votes && (
          <>
            <div className={styles.cards}>
              {/* Interested */}
              <div className={`${styles.card} ${styles.cardGreen}`}>
                <span className={styles.cardLabel}>Interested</span>
                <span className={styles.cardCount}>{interested}</span>
                <span className={styles.cardPct}>{intPct}%</span>
                <div className={styles.bar}>
                  <div
                    className={`${styles.barFill} ${styles.barGreen}`}
                    style={{ width: `${intPct}%` }}
                  />
                </div>
              </div>

              {/* Not Interested */}
              <div className={`${styles.card} ${styles.cardGray}`}>
                <span className={styles.cardLabel}>Not Interested</span>
                <span className={styles.cardCount}>{notInterested}</span>
                <span className={styles.cardPct}>{notPct}%</span>
                <div className={styles.bar}>
                  <div
                    className={`${styles.barFill} ${styles.barGray}`}
                    style={{ width: `${notPct}%` }}
                  />
                </div>
              </div>

              {/* Total */}
              <div className={`${styles.card} ${styles.cardTotal}`}>
                <span className={styles.cardLabel}>Total Votes</span>
                <span className={styles.cardCount}>{total}</span>
              </div>
            </div>

            <button className={styles.refresh} onClick={fetchVotes}>
              Refresh
            </button>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        © 2026 OnGo Instant Bath Wipes — Admin
      </footer>
    </div>
  );
}

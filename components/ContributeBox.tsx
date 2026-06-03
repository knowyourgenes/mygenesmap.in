"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

export default function ContributeBox({
  questionSlug,
  questionTitle,
}: {
  questionSlug: string;
  questionTitle: string;
}) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [credential, setCredential] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 5 || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "answer",
          text,
          authorName: name,
          authorCredential: credential,
          questionSlug,
          questionTitle,
        }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      setText("");
      setName("");
      setCredential("");
      setMsg(
        "Thanks — your answer is in the review queue. We verify credentials before any title appears beside a name.",
      );
    } catch {
      setState("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="composer composer--answer" id="contribute">
      <div className="composer__head">
        <span className="composer__icon">+</span>
        <div>
          <div className="composer__title">Add your answer</div>
          <div className="composer__sub">
            Have genuine expertise here? Answer in plain language. Professional
            titles are verified before they show.
          </div>
        </div>
      </div>

      <form className="composer__form" onSubmit={submit}>
        <textarea
          className="composer__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your answer — lead with the single sentence that answers it…"
          aria-label="Your answer"
          rows={5}
          maxLength={4000}
        />
        <div className="composer__row">
          <input
            className="composer__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            maxLength={120}
          />
          <input
            className="composer__input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Credential (e.g. Genetic counsellor · 8 years)"
            aria-label="Your credential"
            maxLength={120}
          />
        </div>
        <div className="composer__foot">
          <span className="composer__hint">Posting on: {questionTitle}</span>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={state === "sending"}
          >
            {state === "sending"
              ? "Submitting…"
              : state === "sent"
                ? "Submitted ✓"
                : "Post answer"}
          </button>
        </div>
        {msg ? (
          <p
            className={`composer__status${state === "error" ? " composer__status--err" : ""}`}
          >
            {msg}
          </p>
        ) : null}
      </form>
    </div>
  );
}

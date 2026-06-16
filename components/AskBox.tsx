"use client";

import { useState } from "react";
import { AskIcon } from "./Icons";

type State = "idle" | "sending" | "sent" | "error";

export default function AskBox() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
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
        body: JSON.stringify({ kind: "question", text, authorName: name }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      setText("");
      setName("");
      setMsg(
        "Thanks - your question is in the review queue. The most useful ones get answered and surfaced.",
      );
    } catch {
      setState("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="composer" id="ask">
      <div className="composer__head">
        <span className="composer__icon">
          <AskIcon size={18} />
        </span>
        <div>
          <div className="composer__title">Ask the community</div>
          <div className="composer__sub">
            In plain words - researchers, clinicians and genetic counsellors
            take a look.
          </div>
        </div>
      </div>

      <form className="composer__form" onSubmit={submit}>
        <input
          className="composer__input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything about genes, DNA, testing, or inheritance…"
          aria-label="Your question"
          maxLength={4000}
        />
        <div className="composer__row">
          <input
            className="composer__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            aria-label="Your name"
            maxLength={120}
          />
          <button
            type="submit"
            className="btn btn--primary"
            disabled={state === "sending"}
          >
            {state === "sending"
              ? "Sending…"
              : state === "sent"
                ? "Sent ✓"
                : "Ask question"}
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

"use client";

import { useState } from "react";

type ContractCopyProps = {
  address: string;
};

export function ContractCopy({ address }: ContractCopyProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contract-card" aria-label="GPU contract address">
      <div className="contract-copy">
        <span>Official contract / BSC</span>
        <code>{address}</code>
      </div>
      <button type="button" onClick={copyAddress} aria-label="Copy GPU contract address">
        {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Copy CA"}
        <span aria-hidden="true">{status === "copied" ? "✓" : "⎘"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Contract address copied to clipboard." : ""}
      </span>
    </div>
  );
}

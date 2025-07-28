"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { QuickBetModal } from "./quick-bet-modal";

export function QuickBetButton() {
  const [showQuickBet, setShowQuickBet] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowQuickBet(true)}
        className="h-12 w-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
        size="icon"
      >
        <Zap className="h-5 w-5" />
      </Button>

      <QuickBetModal
        isOpen={showQuickBet}
        onClose={() => setShowQuickBet(false)}
      />
    </>
  );
}

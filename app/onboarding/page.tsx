"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Globe, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const leagues = [
  { id: "premier-league", name: "Premier League", country: "England" },
  { id: "la-liga", name: "La Liga", country: "Spain" },
  { id: "bundesliga", name: "Bundesliga", country: "Germany" },
  { id: "serie-a", name: "Serie A", country: "Italy" },
  { id: "ligue-1", name: "Ligue 1", country: "France" },
  { id: "champions-league", name: "Champions League", country: "Europe" },
  { id: "europa-league", name: "Europa League", country: "Europe" },
];

const timezones = [
  "GMT-8 (PST)",
  "GMT-5 (EST)",
  "GMT+0 (GMT)",
  "GMT+1 (CET)",
  "GMT+2 (EET)",
  "GMT+8 (CST)",
  "GMT+9 (JST)",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [timezone, setTimezone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLeagueToggle = (leagueId: string) => {
    setSelectedLeagues((prev) =>
      prev.includes(leagueId)
        ? prev.filter((id) => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const handleComplete = async () => {
    if (selectedLeagues.length === 0) {
      toast.error("Please select at least one league");
      return;
    }
    if (!timezone) {
      toast.error("Please select your timezone");
      return;
    }

    setIsLoading(true);

    // Mock setup completion
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Setup complete! Welcome to AI Football Predictor!");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600">
              <Trophy className="size-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            Welcome to AI Football Predictor!
          </CardTitle>
          <CardDescription>Let's customize your experience</CardDescription>
          <div className="flex justify-center mt-4">
            <Badge
              variant={step === 1 ? "default" : "secondary"}
              className="mr-2"
            >
              Step {step} of 2
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Select Your Favorite Leagues
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {leagues.map((league) => (
                    <div
                      key={league.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedLeagues.includes(league.id)
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleLeagueToggle(league.id)}
                    >
                      <Checkbox
                        checked={selectedLeagues.includes(league.id)}
                        onChange={() => {}}
                      />
                      <div>
                        <div className="font-medium">{league.name}</div>
                        <div className="text-sm text-gray-500">
                          {league.country}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={selectedLeagues.length === 0}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Select Your Timezone
                </h3>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Your Selected Preferences:
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                      Leagues:{" "}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {selectedLeagues
                        .map((id) => leagues.find((l) => l.id === id)?.name)
                        .join(", ")}
                    </span>
                  </div>
                  {timezone && (
                    <div>
                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                        Timezone:{" "}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {timezone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!timezone || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? "Setting up..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Mail,
  Smartphone,
  Monitor,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "win",
    title: "Prediction Won!",
    message: "Your Chelsea vs Tottenham prediction was correct. You won $120!",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "alert",
    title: "Upset Alert",
    message:
      "Brighton vs Liverpool shows potential for upset. Review your prediction.",
    time: "4 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "info",
    title: "New Predictions Available",
    message: "AI has analyzed 5 new matches for tomorrow. Check them out!",
    time: "6 hours ago",
    unread: false,
  },
  {
    id: 4,
    type: "performance",
    title: "Weekly Performance Summary",
    message: "Your ROI increased by 2.1% this week. Great job!",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 5,
    type: "loss",
    title: "Prediction Result",
    message: "PSG vs Lyon didn't go as predicted. Better luck next time!",
    time: "2 days ago",
    unread: false,
  },
];

function getNotificationIcon(type: string) {
  switch (type) {
    case "win":
      return <TrendingUp className="h-5 w-5 text-emerald-600" />;
    case "alert":
      return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-600" />;
    case "performance":
      return <CheckCircle className="h-5 w-5 text-purple-600" />;
    case "loss":
      return <TrendingUp className="h-5 w-5 text-red-600" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600" />;
  }
}

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Stay updated with prediction alerts and results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Mark All Read</Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    notification.unread
                      ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                      : ""
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <div className="flex items-center space-x-2">
                        {notification.unread && (
                          <Badge
                            variant="default"
                            className="h-2 w-2 p-0 rounded-full bg-blue-600"
                          />
                        )}
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prediction Results */}
              <div className="space-y-4">
                <h4 className="font-medium">Prediction Results</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wins" className="text-sm">
                      Winning predictions
                    </Label>
                    <Switch id="wins" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="losses" className="text-sm">
                      Losing predictions
                    </Label>
                    <Switch id="losses" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Alerts */}
              <div className="space-y-4">
                <h4 className="font-medium">Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="upsets" className="text-sm">
                      Upset alerts
                    </Label>
                    <Switch id="upsets" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-predictions" className="text-sm">
                      New predictions
                    </Label>
                    <Switch id="new-predictions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-confidence" className="text-sm">
                      High confidence tips
                    </Label>
                    <Switch id="high-confidence" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Performance */}
              <div className="space-y-4">
                <h4 className="font-medium">Performance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-summary" className="text-sm">
                      Weekly summary
                    </Label>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="milestone" className="text-sm">
                      Milestones achieved
                    </Label>
                    <Switch id="milestone" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="leaderboard" className="text-sm">
                      Leaderboard changes
                    </Label>
                    <Switch id="leaderboard" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Methods</CardTitle>
              <CardDescription>
                How would you like to receive notifications?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="in-app" className="text-sm">
                    In-app notifications
                  </Label>
                </div>
                <Switch id="in-app" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="email" className="text-sm">
                    Email notifications
                  </Label>
                </div>
                <Switch id="email" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-4 w-4 text-gray-600" />
                  <Label htmlFor="push" className="text-sm">
                    Push notifications
                  </Label>
                </div>
                <Switch id="push" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

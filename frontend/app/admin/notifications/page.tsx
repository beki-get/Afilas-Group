"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Mail,
  CalendarDays,
  FlaskConical,
  MessageSquare,
} from "lucide-react";
import { adminFetch } from "../../../lib/adminApi";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  relatedId: string | null;
  relatedType: string | null;
  createdAt: string;
  updatedAt: string;
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "CONTACT":
      return Mail;

    case "HOSPITAL_BOOKING":
      return CalendarDays;

    case "DIAGNOSIS_BOOKING":
      return FlaskConical;

    case "PHARMA_INQUIRY":
      return FlaskConical;

    default:
      return MessageSquare;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await adminFetch<Notification[]>(
        "/api/admin/notifications"
      );

      setNotifications(response);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await adminFetch(`/api/admin/notifications/${id}/read`, {
        method: "PATCH",
      });

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setMarkingAll(true);

      await adminFetch("/api/admin/notifications/read-all", {
        method: "PATCH",
      });

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    } finally {
      setMarkingAll(false);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-[var(--admin-accent-text)]" />
            <h1 className="text-2xl font-semibold">
              Notifications
            </h1>
          </div>

          <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
            Stay updated with important activity across Afilas Group.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={markingAll}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-text-secondary)] transition-colors hover:bg-[var(--admin-hover-bg)] hover:text-[var(--admin-text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck className="size-4" />
            {markingAll ? "Marking..." : "Mark all as read"}
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
        {loading ? (
          <div className="p-8 text-center text-sm text-[var(--admin-text-secondary)]">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Bell className="mb-3 size-10 text-[var(--admin-text-secondary)]" />

            <h2 className="text-lg font-medium">
              No notifications
            </h2>

            <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
              You&apos;re all caught up.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--admin-border)]">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);

              return (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 transition-colors ${
                    notification.isRead
                      ? "bg-[var(--admin-surface)]"
                      : "bg-[var(--admin-accent-bg)]"
                  }`}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--admin-hover-bg)]">
                    <Icon className="size-5 text-[var(--admin-accent-text)]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <h3
                        className={`text-sm ${
                          notification.isRead
                            ? "font-medium"
                            : "font-semibold"
                        }`}
                      >
                        {notification.title}
                      </h3>

                      <span className="shrink-0 text-xs text-[var(--admin-text-secondary)]">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--admin-text-secondary)]">
                      {notification.message}
                    </p>

                    {!notification.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--admin-accent-text)] hover:underline"
                      >
                        <Check className="size-3.5" />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
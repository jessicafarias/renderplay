"use client";

import { useFirstPerson } from "@/hooks/useFirstPerson";

export default function FirstPersonControls({ enabled }: { enabled: boolean }) {
  useFirstPerson(enabled);
  return null;
}
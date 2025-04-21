"use client";
import { LarkCalendarEvent } from "@/utils/type";
import { cx } from "@emotion/css";
import { useRef } from "react";
import type { Event } from "react-big-calendar";
export function EventBlock({ event }: { event: Event }) {
  return <EventCheckbox event={event} />;
}

function EventCheckbox({ event }: { event: Event }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <label
      className={cx(
        "relative block w-full h-full",
        "border-amber-500 border-2 rounded-md",
        inputRef.current?.checked ? "bg-blue-300" : ""
      )}
    >
      <input className="invisible absolute" type="checkbox" ref={inputRef} />
      <EventBasic event={event} />
    </label>
  );
}

function EventBasic({
  event,
  className,
}: Readonly<{
  event: Event;
  className?: string;
}>) {
  const eventWithType = event as LarkCalendarEvent & Event;
  return (
    <div className={cx("", className)}>
      <img
        className="block w-16 aspect-square rounded-full object-cover"
        src="/event-headshot.jpg"
      />
      <p className="bg-cyan-400">{eventWithType.location?.name}</p>
      <p>{eventWithType.summary}</p>
    </div>
  );
}

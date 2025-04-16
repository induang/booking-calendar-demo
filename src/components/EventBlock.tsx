"use client";
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
  return (
    <div className={cx("", className)}>
      <img
        className="block w-full aspect-square rounded-full object-cover"
        src="/event-headshot.jpg"
      />
      <p>{event.title}</p>
      <p>地点</p>
    </div>
  );
}

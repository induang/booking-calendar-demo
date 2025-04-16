"use client";
import {
  Calendar,
  CalendarProps,
  Event,
  Views,
  dayjsLocalizer,
} from "react-big-calendar";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { css, cx } from "@emotion/css";
import { EventBlock } from "@/components/EventBlock";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const calendarProps: CalendarProps = useMemo(() => {
    const localizer = dayjsLocalizer(dayjs);
    const views = [Views.MONTH, Views.WEEK, Views.DAY];
    const components = {
      event: EventBlock,
      // eventWrapper: EventWrapper,
    };
    const defaultView = "week";
    const min = dayjs("2025-04-14 09:00").toDate();
    const max = dayjs("2025-04-14 17:00").toDate();

    const events = [
      {
        id: 1,
        title: "Event 1",
        start: dayjs("2025-04-14 09:00").toDate(),
        end: dayjs("2025-04-14 12:00").toDate(),
      },
      {
        id: 3,
        title: "Event 3",
        start: dayjs("2025-04-14 09:00").toDate(),
        end: dayjs("2025-04-14 12:00").toDate(),
      },
      {
        id: 2,
        title: "Event 2",
        start: dayjs("2025-04-14 13:00").toDate(),
        end: dayjs("2025-04-14 17:00").toDate(),
      },
    ];

    const onSelectEvent = (event: Event) => {
      setSelectedEvent(event);
    };
    const eventPropGetter = (
      event: Event,
      start: Date,
      end: Date,
      isSelected: boolean
    ) => {
      return {
        className: cx(
          "text-black!",
          "bg-transparent! border-none! p-0!",
          isSelected && "border-none!",
          css`
            .rbc-event-label {
              display: none !important;
            }
          `
        ),
      };
    };

    console.log(dayjs(1609430400).format("YYYY-MM-DD HH:mm"));

    return {
      localizer,
      views,
      events,
      components,
      defaultView,
      min,
      max,
      onSelectEvent,
      eventPropGetter,
    };
  }, []);
  console.log(Date.now());
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Calendar {...calendarProps} />
        <div>
          <p>{selectedEvent?.title}</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}

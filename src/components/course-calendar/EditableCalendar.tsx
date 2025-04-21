"use client";

import {
  Calendar,
  CalendarProps,
  Event,
  SlotInfo,
  Views,
  dayjsLocalizer,
} from "react-big-calendar";
import dayjs from "@/utils/date";
import { useCallback, useMemo, useState } from "react";
import { css, cx } from "@emotion/css";
import { EventBlock } from "@/components/course-calendar/EventBlock";
import { Modal, Select, TimePicker } from "antd";

const events: Event[] = [];

export const EditableCalendar = () => {
  const [open, setOpen] = useState(false);
  const [slotInfo, setSlotInfo] = useState<SlotInfo>();
  const [position, setPosition] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

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

    // const onSelectEvent = (event: Event) => {
    //   setSelectedEvent(event);
    // };
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

    const onSelectSlot = (slotInfo: SlotInfo) => {
      setOpen(true);
      setSlotInfo(slotInfo);
    };

    return {
      localizer,
      views,
      components,
      defaultView,
      min,
      max,
      // onSelectEvent,
      eventPropGetter,
      showMultiDayTimes: true,
      selectable: true,
      step: 30,
      onSelectSlot,
    };
  }, []);

  const handleInsertEvent = useCallback(() => {
    const newEvent: Event = {
      location: { name: `${position} - ${price}` },
      start: slotInfo?.start,
      end: slotInfo?.end,
    };
    events.push(newEvent);
    setOpen(false);
  }, [slotInfo, position, price]);

  return (
    <>
      <div className="h-[600px] w-[calc(100vw-200px)]">
        <Calendar {...calendarProps} events={events} />
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleInsertEvent}
      >
        <div className="text-2xl font-bold">添加课程</div>
        <TimePicker.RangePicker
          className="mt-4"
          format="HH:mm"
          value={[dayjs(slotInfo?.start), dayjs(slotInfo?.end)]}
          onChange={(value) => {
            console.log(value);
          }}
        />
        <Select
          placeholder="上课雪场"
          options={[
            { label: "神乐", value: "神乐" },
            { label: "苗场", value: "苗场" },
          ]}
          value={position}
          onChange={(value) => {
            setPosition(value);
          }}
        />
        <Select
          placeholder="设置价格"
          value={price}
          onChange={(value) => {
            setPrice(value);
          }}
          options={[
            { label: "1000", value: 1000 },
            { label: "2000", value: 2000 },
            { label: "3000", value: 3000 },
          ]}
        />
      </Modal>
    </>
  );
};

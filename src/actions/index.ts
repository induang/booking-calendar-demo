"use server";

import * as lark from "@larksuiteoapi/node-sdk";
import larkClient from "@/libs/lark";

export async function listEvents() {
  return larkClient.calendar.v4.calendarEvent.list(
    {
      path: {
        calendar_id:
          "feishu.cn_bCA1WJHoo0VaGXCELoTWvf@group.calendar.feishu.cn",
      },
      params: {
        page_size: 500,
      },
    },
    lark.withTenantToken("t-g1044hbMLLUHVHNLTXU7IZADPABYUU7USILJ76WN")
  );
}

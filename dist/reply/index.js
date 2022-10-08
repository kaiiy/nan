"use strict";
export const replyMessage = async (client, ev) => {
  if (ev.type !== "message" || ev.message.type !== "text")
    return;
  const replyToken = ev.replyToken;
  const response = {
    type: "text",
    text: "\u3053\u3093\u3070\u3093\u306F"
  };
  await client.replyMessage(replyToken, response);
};

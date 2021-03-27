import { expect } from "chai";
import { parseMarkdown } from "../src";

describe("parseMarkdown", () => {
  it("should return parsed markdown tokens", () => {
    expect(
      parseMarkdown(
        "#residents\nЦікавий матеріал для вечірнього читання та чудова нагода познайомитися ближче з andcards: https://www.andcards.com"
      )
    ).is.deep.equal([
      { hashtag: "residents", type: "hashtag", value: "#residents" },
      {
        type: "text",
        value: "\nЦікавий матеріал для вечірнього читання та чудова нагода познайомитися ближче з andcards: ",
      },
      { href: "https://www.andcards.com", type: "link", value: "https://www.andcards.com" },
    ]);
    expect(
      parseMarkdown(
        "Вечір п'ятниці для відвертих тем і міцних жартів. Але цього разу пристойно! Приходьте на [Пристойний Стндап](https://www.facebook.com/events/656828768259069/?acontext=%7B%22event_action_history%22%3A[%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%7D) відсвяткувати кінець робочого тижня💪🏼"
      )
    ).is.deep.equal([
      {
        type: "text",
        value: "Вечір п'ятниці для відвертих тем і міцних жартів. Але цього разу пристойно! Приходьте на ",
      },
      {
        href:
          "https://www.facebook.com/events/656828768259069/?acontext=%7B%22event_action_history%22%3A[%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%7D",
        type: "link",
        value: "Пристойний Стндап",
      },
      { type: "text", value: " відсвяткувати кінець робочого тижня💪🏼" },
    ]);
    expect(
      parseMarkdown(
        "Вечір п'ятниці для #відвертих тем і міцних жартів. Але цього разу пристойно! Приходьте на [Пристойний #Стндап](https://www.facebook.com/events/656828768259069/?#hash) відсвяткувати кінець робочого тижня💪🏼"
      )
    ).is.deep.equal([
      { type: "text", value: "Вечір п'ятниці для " },
      { hashtag: "відвертих", type: "hashtag", value: "#відвертих" },
      { type: "text", value: " тем і міцних жартів. Але цього разу пристойно! Приходьте на " },
      { href: "https://www.facebook.com/events/656828768259069/?#hash", type: "link", value: "Пристойний #Стндап" },
      { type: "text", value: " відсвяткувати кінець робочого тижня💪🏼" },
    ]);
    expect(parseMarkdown(`__[anchor](https://www.facebook.com)__`)).is.deep.equal([
      {
        children: [{ type: "link", href: "https://www.facebook.com", value: "anchor" }],
        type: "bold",
      },
    ]);
    expect(parseMarkdown(`#first_hash #second_hash`)).is.deep.equal([
      { type: "hashtag", hashtag: "first_hash", value: "#first_hash" },
      { type: "text", value: " " },
      { type: "hashtag", hashtag: "second_hash", value: "#second_hash" },
    ]);
    expect(parseMarkdown(`#first*hash #second*hash @mention*bold`)).is.deep.equal([
      { type: "hashtag", hashtag: "first*hash", value: "#first*hash" },
      { type: "text", value: " " },
      { type: "hashtag", hashtag: "second*hash", value: "#second*hash" },
      { type: "text", value: " " },
      { type: "mention", mention: "mention", value: "@mention" },
      { type: "text", value: "*bold" },
    ]);
  });
});

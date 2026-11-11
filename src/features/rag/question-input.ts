import { QUESTION_LIMIT, limitQuestion, questionLength } from "./contracts.ts";

export function prepareQuestionInput(value: string) {
  const limited = limitQuestion(value);
  return { value: limited, truncated: limited !== value };
}

export function questionInputFeedback(value: string, wasTruncated: boolean) {
  const count = questionLength(value);
  return [
    wasTruncated && count >= QUESTION_LIMIT
      ? `Teksten ble kuttet til ${QUESTION_LIMIT} tegn. Resten ble ikke tatt med.`
      : "",
    count >= QUESTION_LIMIT * 0.9 ? `${count} av ${QUESTION_LIMIT} tegn.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

import { Fragment } from 'react'

const LATIN_WORDS = /(Maker|maker|UGC)/

/** Wraps Latin brand words inside a Hebrew string in <span dir="ltr">. */
export function withLtr(text) {
  if (typeof text !== 'string' || !LATIN_WORDS.test(text)) return text
  return text.split(LATIN_WORDS).map((part, i) =>
    i % 2 === 1 ? (
      <span dir="ltr" key={i}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

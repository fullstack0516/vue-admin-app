export type SortDirection = "asc" | "desc"

export function ORDERED_STRING_COMPARATOR(a: string, b: string, direction: SortDirection): number {
  switch (direction) {
    case "asc":
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    case "desc":
      return a.toLowerCase() < b.toLowerCase() ? 1 : -1
  }
}

export function ORDERED_BOOLEAN_COMPARATOR(
  a: boolean,
  b: boolean,
  direction: SortDirection,
): number {
  switch (direction) {
    case "asc":
      return a === b ? 1 : -1
    case "desc":
      return a !== b ? 1 : -1
  }
}

export function ORDERED_NUMBER_COMPARATOR(a: number, b: number, direction: SortDirection): number {
  switch (direction) {
    case "asc":
      return a > b ? 1 : -1
    case "desc":
      return a < b ? 1 : -1
  }
}

export function ORDERED_DATE_COMPARATOR(a: Date, b: Date, direction: SortDirection): number {
  const timestampA = a.getTime()
  const timestampB = b.getTime()

  switch (direction) {
    case "asc":
      return timestampA > timestampB ? 1 : -1
    case "desc":
      return timestampA < timestampB ? 1 : -1
  }
}

export const ORDER_OBJECT_COMPARATOR = <T>(
  objectA: T,
  objectB: T,
  keyToSort: keyof T,
  direction: SortDirection,
) => {
  const valueA = objectA[keyToSort]
  const valueB = objectB[keyToSort]

  if (valueA === valueB) {
    return 0
  }

  if (typeof valueA === "number" && typeof valueB === "number")
    return ORDERED_NUMBER_COMPARATOR(valueA, valueB, direction)
  if (typeof valueA === "string" && typeof valueB === "string")
    return ORDERED_STRING_COMPARATOR(valueA, valueB, direction)
  if (typeof valueA === "boolean" && typeof valueB === "boolean")
    return ORDERED_BOOLEAN_COMPARATOR(valueA, valueB, direction)
  if (valueA instanceof Date && valueB instanceof Date)
    return ORDERED_DATE_COMPARATOR(valueA, valueB, direction)
  else {
    switch (direction) {
      case "asc":
        return valueA > valueB ? 1 : -1
      case "desc":
        return valueA < valueB ? 1 : -1
    }
  }
}

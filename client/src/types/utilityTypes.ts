export type KeysWithValuesOfType<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
interface ImportMeta {
  glob(
    pattern: string,
    options?: { eager?: boolean; import?: string; query?: Record<string, string> }
  ): Record<string, () => Promise<unknown>>;
}

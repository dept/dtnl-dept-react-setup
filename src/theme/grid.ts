export interface ThemeGrid {
  gutter: number
  gutterSmall: number
  container: ThemeGridContainer
}

export interface ThemeGridContainer {
  maxWidth: number
  padding: number
  paddingSmall: number
}

export const grid: ThemeGrid = {
  gutter: 30,
  gutterSmall: 15,
  container: {
    maxWidth: 1280,
    padding: 80,
    paddingSmall: 15,
  },
}
